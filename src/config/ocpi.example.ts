import { IOcpiConfig } from "../models/ocpi";
import { OcpiDB } from "../models/database/ocpi-db";

export const ocpiConfig: IOcpiConfig = {
    publicURL: "http://localhost:3001",
    pluggableDB: new OcpiDB()
}