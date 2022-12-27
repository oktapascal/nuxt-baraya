import { H3Event } from 'h3'
import { BasePrivateController } from '~/server/controllers/BasePrivateController'
import { IProfileController } from '~/server/controllers/IProfileController'
import { ProfileUserComplete, ProfileUserResume } from '~/types/web/profile_response'
import { ProfileServices } from '~/server/services/ProfileServices'
import sendDefaultErrorResponse from '~/utils/responses/errorsDefault'

export class ProfileController extends BasePrivateController implements IProfileController {
    constructor(private readonly events:H3Event, private readonly _profileServices: ProfileServices) {
        super(events)
    }

    async getProfileUserComplete(): Promise<ProfileUserComplete|void> {
        try {
            const response: ProfileUserComplete = await this._profileServices.getProfileUserComplete(this.id_user)

            return response
        } catch (e:any) {
            return await sendDefaultErrorResponse(this.events, 'oops', 500, e);
        }
    }

    async getProfileUserResume(): Promise<ProfileUserResume|void> {
        try {
            const response: ProfileUserResume = await this._profileServices.getProfileResume(this.id_user)

            return response
        } catch (e:any) {
            return await sendDefaultErrorResponse(this.events, 'oops', 500, e);
        }
    }
}