import { ITariff, ITariffElement } from "ocn-bridge/dist/models/ocpi/tariffs";
import { IDisplayText } from "ocn-bridge/dist/models/ocpi/common";
import { IPrice } from "ocn-bridge/dist/models/ocpi/session";
import { IEnergyMix } from "ocn-bridge/dist/models/ocpi/locations";

export class Tariff implements ITariff {

    public country_code: string
    public party_id: string
    public id: string
    public currency: string
    public type?: string
    public tariff_alt_text?: IDisplayText[]
    public tariff_alt_url?: string
    public min_price?: IPrice
    public max_price?: IPrice
    public elements: ITariffElement[]
    public start_date_time?: string
    public end_date_time?: string
    public energy_mix?: IEnergyMix
    public last_updated: string

    constructor(input: any, country_code: string, party_id: string) {
        this.country_code = country_code
        this.party_id = party_id
        this.id = input.id
        this.currency = input.currency
        this.elements = input.elements
        this.last_updated = input.last_updated
    }

}