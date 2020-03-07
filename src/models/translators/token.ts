/*
    Copyright 2020 Smart Charging Solutions

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
import { IToken, ITokenType } from "scn-bridge/dist/models/scpi/tokens";

export class Token implements IToken {

    public static downgrade(token: IToken): any {
        return {
            uid: token.uid,
            type: token.type === "RFID" ? "RFID" : "OTHER",
            auth_id: token.contract_id,
            visual_number: token.visual_number,
            issuer: token.issuer,
            valid: token.valid,
            whitelist: token.whitelist,
            language: token.language,
            last_updated: token.last_updated
        }
    }

    public country_code: string
    public party_id: string
    public uid: string
    public type: ITokenType
    public contract_id: string
    public visual_number?: string
    public issuer: string
    public valid: boolean
    public whitelist: string
    public language: string
    public last_updated: string

    constructor(input: any, country_code: string, party_id: string) {
        this.country_code = country_code
        this.party_id = party_id
        this.uid = input.uid
        this.type = input.type
        this.contract_id = input.auth_id
        this.visual_number = input.visual_number
        this.issuer = input.issuer
        this.valid = input.valid
        this.whitelist = input.whitelist
        this.language = input.language
        this.last_updated = input.last_updated
    }

}
