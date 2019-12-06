import { IToken, ITokenType } from "ocn-bridge/dist/models/ocpi/tokens";

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