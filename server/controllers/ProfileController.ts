import { H3Event } from 'h3'
import { IProfileController } from '~/server/controllers/IProfileController'
import { ProfileUserComplete, ProfileUserResume } from '~/types/web/profile_response'
import { ProfileServices } from '~/server/services/ProfileServices'
import sendDefaultErrorResponse from '~/utils/responses/errorsDefault'

export class ProfileController implements IProfileController{
    private id_user: string
    private is_authenticated: boolean
    constructor(private readonly event:H3Event, private readonly _profileServices: ProfileServices) {
        this.id_user = event.context.auth.id_user
        this.is_authenticated = event.context.auth.authenticated
    }

    async getProfileUserComplete(): Promise<ProfileUserComplete|void> {
        try {
            const response: ProfileUserComplete = await this._profileServices.getProfileUserComplete(this.id_user)

            return response
        } catch (e:any) {
            return await sendDefaultErrorResponse(this.event, 'oops', 500, e);
        }
    }

    async getProfileUserResume(): Promise<ProfileUserResume|void> {
        try {
            const response: ProfileUserResume = await this._profileServices.getProfileResume(this.id_user)

            return response
        } catch (e:any) {
            return await sendDefaultErrorResponse(this.event, 'oops', 500, e);
        }
    }
}