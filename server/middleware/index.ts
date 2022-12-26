import { H3Event } from "h3";
import ParseAuthorization from '~/server/handler/parseAuthorization'
import Auth from '~/server/handler/auth'
export default defineEventHandler((event: H3Event) => {
    ParseAuthorization(event)
    Auth(event)
})