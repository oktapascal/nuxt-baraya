import {H3Event} from "h3";
import {ProfileRepository} from "~/server/repositories/ProfileRepository";
import {ProfileServices} from "~/server/services/ProfileServices";
import {ProfileController} from "~/server/controllers/ProfileController";
import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async (event: H3Event) => {
    const prisma = new PrismaClient();
    const profileRepository = new ProfileRepository(prisma);
    const profileServices = new ProfileServices(profileRepository);
    const profileController = new ProfileController(event, profileServices);

    const response = await profileController.getProfileUserComplete();

    return {statusCode: 200, data: response};
});