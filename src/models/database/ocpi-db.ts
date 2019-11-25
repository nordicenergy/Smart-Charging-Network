import { IPluggableDB } from "ocn-bridge";
import { IVersionDetail } from "ocn-bridge/dist/models/ocpi/versions";

export class OcpiDB implements IPluggableDB {
    public async getTokenB(): Promise<string> {
        return "token-b"
    }
    public async setTokenB(token: string): Promise<void> {
        console.log(token)
        return
    }
    public async getTokenC(): Promise<string> {
        return "token-c"
    }
    public async setTokenC(): Promise<void> {
        return
    }
    public async getEndpoint(): Promise<string> {
        return "http://endpoint.org"
    }
    public async saveEndpoints(versionDetail: IVersionDetail): Promise<void> {
        console.log(versionDetail)
        return
    }
}