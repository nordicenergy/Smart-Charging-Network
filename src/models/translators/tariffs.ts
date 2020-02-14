/*
    Copyright 2019-2020 eMobilify GmbH

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
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
        this.tariff_alt_text = input.tariff_alt_text
        this.tariff_alt_url = input.tariff_alt_url
        this.elements = input.elements
        this.energy_mix = input.energy_mix
        this.last_updated = input.last_updated
    }

}