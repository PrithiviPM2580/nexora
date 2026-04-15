"server-only"

import { createMiddleware } from "hono/factory"
import { auth } from "../auth"
import { HTTPException } from "hono/http-exception"

type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>
type AuthUser = NonNullable<AuthSession>["user"]

type Env = {
  Variables: {
    user: AuthUser
  }
}

export const getAuthUser = createMiddleware<Env>(async (c, next) => {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    })

    if (!session) {
      throw new HTTPException(401, {
        message: "Unauthorized",
      })
    }
    c.set("user", session.user)
    await next()
  } catch (error) {
    console.log("Error in getAuthUser middleware:", error)
    throw new HTTPException(500, {
      message: " Internal Server Error",
    })
  }
})
