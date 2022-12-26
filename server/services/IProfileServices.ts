import { ProfileUserComplete, ProfileUserResume } from '~/types/web/profile_response'

export interface IProfileServices {
    getProfileResume(id_user: string): Promise<ProfileUserResume|null>
    getProfileUserComplete(id_user:string): Promise<ProfileUserComplete|null>
}