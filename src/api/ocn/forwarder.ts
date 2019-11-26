import fetch from "node-fetch"
import { IPluggableDB } from "ocn-bridge"

export class Forwarder {

    constructor(public backendDb: IPluggableDB, public country_code: string, public party_id: string) {
    }

    public async makeOcpiRequest(method: string, url: string): Promise<any> {
        const result = await fetch(url, {
            method,
            headers: {
                Authorization: `Token ${await this.backendDb.getTokenC()}`
            }
        })
        if (!result.ok) {
            throw Error(`HTTP request ${method} ${url} failed: ${result.status} ${await result.text()}`)
        }
        const ocpiResult = await result.json()
        if (ocpiResult.status_code !== 1000) {
            throw Error(`OCPI request ${method} ${url} failed: ${ocpiResult.status_code} ${ocpiResult.status_message}`)
        }
        return ocpiResult.data
    }

}