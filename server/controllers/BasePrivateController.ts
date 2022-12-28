import {H3Event} from "h3";

export class BasePrivateController {
    constructor(private event: H3Event) {
    }

    get id_user(): string {
        return this.event.context.auth.id_user;
    }

    get authenticated(): boolean {
        return this.event.context.auth.authenticated;
    }
}
