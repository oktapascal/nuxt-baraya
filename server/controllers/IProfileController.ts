import { ProfileUserComplete, ProfileUserResume } from '~/types/web/profile_response'
export interface IProfileController {
    getProfileUserResume(): Promise<ProfileUserResume|void>
    getProfileUserComplete(): Promise<ProfileUserComplete|void>
}