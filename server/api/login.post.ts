import {H3Event} from "h3";
import {AuthRepository} from "~/server/repositories/AuthRepository";
import {AuthServices} from "~/server/services/AuthServices";
import {AuthController} from "~/server/controllers/AuthController";

export default defineEventHandler(async (event: H3Event) => {
    const authRepository = new AuthRepository();
    const authServices = new AuthServices(authRepository);
    const authController = new AuthController(event, authServices);

    await authController.login();

    return {statusCode: 200, message: "Login Success"};
});
