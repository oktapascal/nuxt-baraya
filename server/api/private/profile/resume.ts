import {H3Event} from "h3";
import {ProfileRepository} from "~/server/repositories/ProfileRepository";
import {ProfileServices} from "~/server/services/ProfileServices";
import {ProfileController} from "~/server/controllers/ProfileController";

export default defineEventHandler(async (event: H3Event) => {
    const profileRepository = new ProfileRepository();
    const profileServices = new ProfileServices(profileRepository);
    const profileController = new ProfileController(event, profileServices);

    const response = await profileController.getProfileUserResume();

    appendHeader(event, "Cache-Control", "private");
    appendHeader(event, "Cache-Control", "max-age=3600");
    return {statusCode: 200, data: response};
});
