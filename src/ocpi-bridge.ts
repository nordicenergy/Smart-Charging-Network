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
import { IPluggableAPI, IPluggableDB } from "ocn-bridge";
import { Locations } from "./api/ocn/locations";
import { EventEmitter } from "events";
import { Tariffs } from "./api/ocn/tariffs";
import { Sessions } from "./api/ocn/sessions";
import { Cdrs } from "./api/ocn/cdrs";
import { Commands } from "./api/ocn/commands";

export class OcpiBridge implements IPluggableAPI {
    public locations: Locations
    public tariffs: Tariffs
    public sessions: Sessions
    public cdrs: Cdrs
    public commands: Commands

    constructor(
        backendDb: IPluggableDB,
        country_code: string,
        party_id: string,
        publicIP: string,
        events: EventEmitter
    ) {
        this.locations = new Locations(backendDb, country_code, party_id, publicIP, events)
        this.tariffs = new Tariffs(backendDb, country_code, party_id, publicIP, events)
        this.sessions = new Sessions(backendDb, country_code, party_id, publicIP, events)
        this.cdrs = new Cdrs(backendDb, country_code, party_id, publicIP, events)
        this.commands = new Commands(backendDb, country_code, party_id, publicIP, events)
    }
}
