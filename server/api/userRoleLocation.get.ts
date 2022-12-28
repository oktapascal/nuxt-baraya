import {H3Event} from "h3";
import {AuthRepository} from "~/server/repositories/AuthRepository";
import {AuthServices} from "~/server/services/AuthServices";
import {AuthController} from "~/server/controllers/AuthController";
import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async (event: H3Event) => {
    const prisma = new PrismaClient();
    const authRepository = new AuthRepository(prisma);
    const authServices = new AuthServices(authRepository);
    const authController = new AuthController(event, authServices);

    const user = await authController.getUserRoleLocation();

    return user;
});