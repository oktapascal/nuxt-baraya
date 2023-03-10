import {UserRoleResponse} from "~/types/web/user_response";

export interface IAuthController {
    login(): Promise<void>;

    save(): Promise<void>;

    logout(): Promise<void>;

    getUserRoleLocation(): Promise<UserRoleResponse | null>;
}