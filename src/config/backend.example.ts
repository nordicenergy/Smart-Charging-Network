import { IOcpiBackendConfig } from "../models/ocpi";
import { OcpiDB } from "../models/database/ocpi-db";

export const backendConfig: IOcpiBackendConfig = {
    registration: {
        versionsURL: "https://qa.backoffice.net/ocpi/versions",
        tokenA: "1234567890"
    },
    publicURL: "http://localhost:3001",
    party_id: "NL",
    country_code: "NKL",
    business_details: {
        name: "NKL (DRIIVZ)"
    },
    pluggableDB: new OcpiDB()
}