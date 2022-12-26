import { H3Event } from 'h3'
import jwt, {JwtPayload} from 'jsonwebtoken'

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
export default defineEventHandler((event: H3Event) => {
  let payload = null
  let privateApi: boolean|undefined
  privateApi = event.node.req.url?.startsWith('/api/private')

  if(privateApi) {
    const authorization = event.node.req.headers.authorization

    if(authorization == undefined) {
      throw createError({statusCode: 401, statusMessage: 'unauthorized' })
    }

    const splitAuthorization = authorization.split(' ')
    const token = splitAuthorization[1]

    if(JWT_ACCESS_SECRET == undefined) {
      throw createError({statusCode: 401, statusMessage: 'unauthorized' })
    }

    jwt.verify(token, JWT_ACCESS_SECRET, function (err, decoded) {
      if(err) {
        throw createError({statusCode: 401, statusMessage: 'unauthorized' })
      }

      if(decoded == undefined) {
        throw createError({statusCode: 401, statusMessage: 'unauthorized' })
      }

      payload = decoded
    })

    if(payload == null) {
      throw createError({statusCode: 401, statusMessage: 'unauthorized' })
    }

    event.context.auth = {
      authenticated: true,
      id_user: (payload as JwtPayload).id_user
    }
  }
})