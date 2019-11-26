import fetch from "node-fetch"
import { IPluggableDB, IBridgeConfigurationOptions } from "ocn-bridge"

export class Forwarder {

    public ocn: {
        country_code: string
        party_id: string
    }

    constructor(public backendDb: IPluggableDB, ocnConfig: IBridgeConfigurationOptions) {
        this.ocn = {
            country_code: ocnConfig.roles[0].country_code,
            party_id: ocnConfig.roles[0].country_code
        }
    }

    public async makeOcpiRequest(method: string, url: string): Promise<any> {
        const result = await fetch(url, {
            method,
            headers: {
                Authorization: `Basic ${await this.backendDb.getTokenC()}`
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