import { IOcpiBackendConfig } from "../models/ocpi";
import { BackendDB } from "../models/database/backend-db";

export const backendConfig: IOcpiBackendConfig = {
    registration: {
        versionsURL: "https://qa.backoffice.net/ocpi/versions",
        tokenA: "1234567890"
    },
    publicURL: "http://localhost:3001",
    party_id: "EMY",
    country_code: "DE",
    business_details: {
        name: "eMobilify GmbH OCN Bridge"
    },
    pluggableDB: new BackendDB()
}