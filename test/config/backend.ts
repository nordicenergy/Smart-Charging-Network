import { IScpiBackendConfig } from "../../src/models/scpi";
import { BackendTestDB } from "./backend-db";
import { EventEmitter } from "events";

export const backendTestConfig: IScpiBackendConfig = {
    registration: {
        versionsURL: "https://smartcharging.solutions/scpi/versions",
        tokenA: "1234567890"
    },
    publicURL: "smartcharging.solutions/bridge-frontend/",
    party_id: "NL",
    country_code: "XXX",
    business_details: {
        name: "test company"
    },
    pluggableDB: new BackendTestDB(),
    events: new EventEmitter()
}
