import {ProfileUserComplete, ProfileUserResume} from "~/types/web/profile_response";
import {H3Event} from "h3";

export interface IProfileServices {
    getProfileResume(event: H3Event, id_user: string): Promise<ProfileUserResume | void>;

    getProfileUserComplete(event: H3Event, id_user: string): Promise<ProfileUserComplete | void>;
}