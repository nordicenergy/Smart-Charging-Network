import { IOcpiBackendConfig } from "../models/ocpi";
import { BackendDB } from "../models/database/backend-db";

export const backendConfig: IOcpiBackendConfig = {
    registration: {
        versionsURL: "https://smartchain.driivz.com/externalIncoming/ocpi/cpo/versions",
        tokenA: "jgkhfa4-skjdhfwjk5-fswjkdfhskj-pwrhas583"
    },
    publicURL: "http://localhost:3001",
    party_id: "DE",
    country_code: "EMY",
    business_details: {
        name: "eMobilify GmbH OCN Bridge"
    },
    pluggableDB: new BackendDB()
}