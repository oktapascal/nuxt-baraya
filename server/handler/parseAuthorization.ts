import {H3Event} from "h3";

export default defineEventHandler((event: H3Event) => {
    const privateApi = event.node.req.url?.startsWith("/api/private");

    if (privateApi) {
        const token = getCookie(event, "access-token");

        if (token == undefined) {
            throw createError({statusCode: 401, statusMessage: "Unauthorized"});
        }

        event.node.req.headers.authorization = `Bearer ${token}`;
    }
});