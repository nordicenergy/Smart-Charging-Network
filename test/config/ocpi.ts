import { IOcpiConfig } from "../../src/models/ocpi";
import { OcpiTestDB } from "./ocpi-db";

export const ocpiTestConfig: IOcpiConfig = {
    publicURL: "http://localhost:3001",
    pluggableDB: new OcpiTestDB()
}