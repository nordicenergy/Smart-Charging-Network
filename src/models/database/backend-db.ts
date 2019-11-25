import { IPluggableDB } from "ocn-bridge";
import * as sqlite3 from "better-sqlite3"
import { IVersionDetail } from "ocn-bridge/dist/models/ocpi/versions";

export class BackendDB implements IPluggableDB {

    private db: sqlite3.Database

    constructor() {
        this.db = sqlite3.default("gateway.db")
        this.db.prepare("CREATE TABLE IF NOT EXISTS auth (id INTEGER UNIQUE, token_b TEXT, token_c TEXT)").run()
        this.db.prepare("CREATE TABLE IF NOT EXISTS endpoints (identifier TEXT, url TEXT)").run()

        const exists = this.db.prepare("SELECT id FROM auth").pluck().get()
        if (!exists) {
            this.db.prepare("INSERT INTO auth (id) values (1)").run()
        }
    }

    public async getTokenB(): Promise<string> {
        const token_b = this.db.prepare("SELECT token_b FROM auth WHERE id = 1").pluck().get()
        return token_b || ""
    }

    public async setTokenB(tokenB: string) {
        this.db.prepare("UPDATE auth SET token_b = ? WHERE id = 1").run(tokenB)
    }

    public async getTokenC(): Promise<string> {
        const token_c = this.db.prepare("SELECT token_c FROM auth WHERE id = 1").pluck().get()
        return token_c || ""
    }

    public async setTokenC(tokenC: string) {
        this.db.prepare("UPDATE auth SET token_c = ? WHERE id = 1").run(tokenC)
    }

    public async saveEndpoints(versionDetail: IVersionDetail) {
        for (const endpoint of versionDetail.endpoints) {

            const exists = this.db
                .prepare("SELECT url FROM endpoints WHERE identifier = ?")
                .pluck()
                .get(endpoint.identifier)

            if (exists) {
                this.db
                    .prepare("UPDATE endpoints SET url = ? WHERE identifier = ?")
                    .run(endpoint.url, endpoint.identifier)
            } else {
                this.db
                    .prepare("INSERT INTO endpoints (identifier, url) VALUES (?,?)")
                    .run(endpoint.identifier, endpoint.url)
            }
        }
    }

    public async getEndpoint(identifier: string): Promise<string> {
        const url = this.db.prepare("SELECT url FROM endpoints WHERE identifier = ?").pluck().get(identifier)
        return url || ""
    }
}
