import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { handle } from "hono/vercel"
import { noteRoute } from "./note"

export const runtime = "nodejs"

const app = new Hono()

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse()
  }

  return c.json({ message: "Internal Server Error" }, 500)
})

const routes = app.basePath("/api").route("/note", noteRoute)

routes.get("/", (c) => {
  return c.json({
    message: "Hello from Nexora API!",
  })
})

export type AppType = typeof routes

export const GET = handle(app)
export const POST = handle(app)
