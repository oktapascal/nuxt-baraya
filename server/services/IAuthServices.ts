import {H3Event} from "h3";
import {LoginRequest} from "~/types/web/login_request";
import {SessionRequest} from "~/types/web/session_request";
import {UserRoleResponse} from "~/types/web/user_response";
import {RegisterRequest} from "~/types/web/register_request";

export interface IAuthServices {
    showUser(event: H3Event, request: LoginRequest): Promise<string | void>;

    storeSessionUser(event: H3Event, request: SessionRequest): Promise<void>;

    register(event: H3Event, request: RegisterRequest): Promise<void>;

    logout(event: H3Event, authToken: string): Promise<void>;

    getUserBySession(event: H3Event, authToken: string): Promise<string | null>;

    getUserRoleLocation(event: H3Event, id_user: string): Promise<UserRoleResponse | null>;
}