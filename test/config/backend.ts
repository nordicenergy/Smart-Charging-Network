import { IOcpiBackendConfig } from "../../src/models/ocpi";
import { BackendTestDB } from "./backend-db";
import { EventEmitter } from "events";

export const backendTestConfig: IOcpiBackendConfig = {
    registration: {
        versionsURL: "https://qa.backoffice.net/ocpi/versions",
        tokenA: "1234567890"
    },
    publicURL: "http://localhost:3001",
    party_id: "NL",
    country_code: "XXX",
    business_details: {
        name: "test company"
    },
    pluggableDB: new BackendTestDB(),
    events: new EventEmitter()
}