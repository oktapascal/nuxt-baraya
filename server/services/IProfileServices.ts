import { ProfileUserComplete, ProfileUserResume } from '~/types/web/profile_response'

export interface IProfileServices {
    getProfileResume(id_user: string): Promise<ProfileUserResume>
    getProfileUserComplete(id_user:string): Promise<ProfileUserComplete>
}