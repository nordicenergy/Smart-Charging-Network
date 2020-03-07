import { IPluggableDB } from "scn-bridge";

export class BackendTestDB implements IPluggableDB {
    public async getTokenB(): Promise<string> {
        return "token-b"
    }
    public async sctTokenB(): Promise<void> {
        return
    }
    public async getTokenC(): Promise<string> {
        return "token-c"
    }
    public async sctTokenC(): Promise<void> {
        return
    }
    public async getEndpoint(): Promise<string> {
        return "http://endpoint.org"
    }
    public async saveEndpoints(): Promise<void> {
        return
    }
}
