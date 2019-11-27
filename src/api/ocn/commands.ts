import { IAsyncCommand, CommandResponseType, ICommandResult } from "ocn-bridge/dist/models/ocpi/commands"
import { Forwarder } from "./forwarder"
import { IStartSession } from "ocn-bridge/dist/models/pluggableAPI"
import * as uuid from "uuid"

export class Commands extends Forwarder {

    public receiver = {

        startSession: async (request: IStartSession): Promise<IAsyncCommand> => {

            const url = await this.backendDb.getEndpoint("commands", "RECEIVER")
            const uid = uuid.v4()
            const body = {
                response_url: `${this.publicIP}/ocpi/2.1.1/commands/START_SESSION/${uid}`,
                ...request
            }
            const commandResponse = await this.makeOcpiRequest("POST", `${url}/START_SESSION`, body)

            return {
                commandResponse: {
                    result: commandResponse.result,
                    timeout: 30
                },
                commandResult: async (): Promise<ICommandResult> => {
                    return new Promise((resolve, _) => {
                        this.events.once(`START_SESSION/${uid}`, (result) => {
                            resolve({result})
                        })
                    })
                }
            }
        },

        stopSession: async (sessionID: string): Promise<IAsyncCommand> => {

            const url = await this.backendDb.getEndpoint("commands", "RECEIVER")
            const uid = uuid.v4()
            const body = {
                response_url: `${this.publicIP}/ocpi/2.1.1/commands/STOP_SESSION/${uid}`,
                session_id: sessionID
            }
            const commandResponse = await this.makeOcpiRequest("POST", `${url}/STOP_SESSION`, body)

            return {
                commandResponse: {
                    result: commandResponse.result,
                    timeout: 30
                },
                commandResult: async (): Promise<ICommandResult> => {
                    return new Promise((resolve, _) => {
                        this.events.once(`STOP_SESSION/${uid}`, (result) => {
                            resolve({result})
                        })
                    })
                }
            }
        },

        reserveNow: async (): Promise<IAsyncCommand> => {
            return {
                commandResponse: {
                    result: CommandResponseType.NOT_SUPPORTED,
                    timeout: 0
                }
            }
        },

        cancelReservation: async (): Promise<IAsyncCommand> => {
            return {
                commandResponse: {
                    result: CommandResponseType.NOT_SUPPORTED,
                    timeout: 0
                }
            }
        },

        unlockConnector: async (): Promise<IAsyncCommand> => {
            return {
                commandResponse: {
                    result: CommandResponseType.NOT_SUPPORTED,
                    timeout: 0
                }
            }
        },

    }

}