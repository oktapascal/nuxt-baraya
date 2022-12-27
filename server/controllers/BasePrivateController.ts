import { H3Event } from 'h3'

export class BasePrivateController {
    private _id_user: string
    private _authenticated: boolean

    constructor(event: H3Event) {
        this._id_user = event.context.auth.id_user
        this._authenticated = event.context.auth.authenticated
    }

    get id_user(): string {
        return this._id_user
    }

    set id_user(value: string) {
        this._id_user = value
    }

    get authenticated(): boolean {
        return this._authenticated
    }

    set authenticated(value: boolean) {
        this._authenticated = value
    }
}