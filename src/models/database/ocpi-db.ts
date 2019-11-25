import { IPluggableDB } from "ocn-bridge";

export class OcpiDB implements IPluggableDB {
    public async getTokenB(): Promise<string> {
        return "token-b"
    }
    public async setTokenB(): Promise<void> {
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
    public async saveEndpoints(): Promise<void> {
        return
    }
}