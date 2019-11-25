import fetch, { Response } from "node-fetch"
import * as uuid from "uuid"
import { backendConfig as config } from "../src/config/backend"
import { startOcpiApi, stopOcpiApi } from "../src/api/ocpi/ocpi"

const register = async () => {

    // start own OCPI 2.1.1 server so recipient can find our versions
    const api = await startOcpiApi(config)

    // get implemented versions
    const versions = await sendGetRequest(config.registration.versionsURL)
    const foundVersion = versions.find((version: { version: string, url: string }) => version.version === "2.1.1")
    if (!foundVersion) {
        throw Error("Could not find common version 2.1.1")
    }

    // use matched version (2.1.1) url to find endpoints
    const versionDetail = await sendGetRequest(foundVersion.url)
    const credentialsEndpoint = versionDetail.enpdoints.find((endpoint: { identifier: string, url: string }) => endpoint.identifier === "credentials")
    if (!credentialsEndpoint) {
        throw Error("No credentials endpoint found")
    }
    await config.pluggableDB.saveEndpoints(versionDetail)

    // generate TOKEN_B for recipient to use when authenticating themselves on our system
    const tokenB = uuid.v4()
    await config.pluggableDB.setTokenB(tokenB)

    // complete the credentials handshake with the recipient
    const credentials = await sendCredentialsRequest(credentialsEndpoint.url, tokenB)
    if (!credentials.token) {
        throw Error("Did not get token back from credentials handshake")
    }

    // stop running our OCPI 2.1.1 server
    await stopOcpiApi(api)

    return credentials
}

const sendGetRequest = async (url: string): Promise<any> => {
    const res = await fetch(url, {
        headers: { Authorization: `Token ${config.registration.tokenA}`}
    })
    return parseResponse(res, url)
}

const sendCredentialsRequest = async (url: string, tokenB: string): Promise<any> => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Token ${config.registration.tokenA}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: `${config.publicURL}/backend/ocpi/versions`,
            token: tokenB,
            party_id: config.party_id,
            country_code: config.country_code,
            business_details: config.business_details
        })
    })
    return parseResponse(res, url)
}

const parseResponse = async (res: Response, url: string): Promise<any> => {
    if (!res.ok) {
        throw Error(`HTTP Request to ${url} failed: ${await res.text()}`)
    }
    const body = await res.json()
    if (body.status_code !== 1000) {
        throw Error(`OCPI request to ${url} failed: ${body.status_message}`)
    }
    return body.data
}

register()
    .then((credentials) => console.log(`Registration to ${config.registration.versionsURL} complete. Got TOKEN_C = ${credentials.token}`))
    .catch((err) => console.error(err.message))
