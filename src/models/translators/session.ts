import { ISession, ICdrToken, authMethod, IChargingPeriod, IPrice, sessionStatus } from "ocn-bridge/dist/models/ocpi/session";

export class Session implements ISession {

    public country_code: string
    public party_id: string
    public id: string
    public start_date_time: string
    public end_date_time?: string
    public kwh: number
    public cdr_token: ICdrToken
    public auth_method: authMethod
    public authorization_reference?: string
    public location_id: string
    public evse_uid: string
    public connector_id: string
    public meter_id?: string
    public currency: string
    public charging_periods?: IChargingPeriod[]
    public total_cost?: IPrice
    public status: sessionStatus
    public last_updated: string

    constructor(input: any, country_code: string, party_id: string) {
        this.country_code = country_code
        this.party_id = party_id
        this.id = input.id
        this.start_date_time = input.start_date_time
        this.end_date_time = input.end_date_time
        this.kwh = input.kwh
        this.cdr_token = {
            uid: "",
            type: input.auth_method === "RFID" ? "RFID" : "APP_USER",
            contract_id: input.auth_id
        }
        this.auth_method = input.auth_method
        this.location_id = input.location.id
        this.evse_uid = input.location.evses[0].uid
        this.connector_id = input.location.evses[0].connectors[0].id
        this.meter_id = input.meter_id
        this.currency = input.currency
        // FLAT CdrDimension type doesn't exist in 2.2
        if (input.charging_periods) {
            this.charging_periods = input.charging_periods.map((period: any) => period.dimensions.filter((dimension: any) => dimension.type !== "FLAT"))
        }
        this.total_cost = {
            excl_vat: input.price,
            incl_vat: input.price
        }
        this.status = input.status
        this.last_updated = input.last_updated
    }

}