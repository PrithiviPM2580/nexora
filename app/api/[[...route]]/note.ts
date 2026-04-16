import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { noteIdSchema, noteSchema, noteUpdateSchema } from "@/validator/note"
import { getAuthUser } from "@/lib/hono/hono-middleware"
import { prisma } from "@/lib/prisma"
import { HTTPException } from "hono/http-exception"

export const noteRoute = new Hono()
  .post("/create", zValidator("json", noteSchema), getAuthUser, async (c) => {
    try {
      const user = c.get("user")
      const { title, content } = c.req.valid("json")

      const note = await prisma.note.create({
        data: {
          title: title,
          content: content,
          userId: user.id,
        },
      })

      return c.json({
        success: true,
        data: note,
      })
    } catch (error) {
      console.log("Error creating note:", error)
      throw new HTTPException(500, { message: "Failed to create note" })
    }
  })
  .patch(
    "/update/:id",
    zValidator("param", noteIdSchema),
    zValidator("json", noteUpdateSchema),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user")
        const { id } = c.req.valid("param")
        const body = c.req.valid("json")

        const existingNote = await prisma.note.findFirst({
          where: {
            id: id,
            userId: user.id,
          },
        })

        if (!existingNote) {
          throw new HTTPException(404, { message: "Note not found" })
        }

        const updatedNote = await prisma.note.update({
          where: {
            id: id,
          },
          data: {
            title: body.title,
            content: body.content,
          },
        })

        return c.json({
          success: true,
          data: updatedNote,
        })
      } catch (error) {
        console.log("Error updating note:", error)
        throw new HTTPException(500, { message: "Failed to update note" })
      }
    }
  )
  .delete(
    "/delete/:id",
    zValidator("param", noteIdSchema),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user")
        const { id } = c.req.valid("param")

        const existingNote = await prisma.note.findFirst({
          where: {
            id: id,
            userId: user.id,
          },
        })

        if (!existingNote) {
          throw new HTTPException(404, { message: "Note not found" })
        }

        await prisma.note.delete({
          where: {
            id: id,
          },
        })

        return c.json({
          success: true,
          message: "Note deleted successfully",
        })
      } catch (error) {
        console.log("Error deleting note:", error)
        throw new HTTPException(500, { message: "Failed to delete note" })
      }
    }
  )
  .get("/all", getAuthUser, async (c) => {
    try {
      const user = c.get("user")
      const query = c.req.query()

      const page = query.page ? parseInt(query.page, 10) : 1
      const limit = query.limit ? parseInt(query.limit, 10) : 20

      const skip = (page - 1) * limit

      const [notes, total] = await Promise.all([
        prisma.note.findMany({
          where: {
            userId: user.id,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: skip,
          take: limit,
        }),
        prisma.note.count({
          where: {
            userId: user.id,
          },
        }),
      ])

      const totalPages = Math.ceil(total / limit)
      return c.json({
        success: true,
        data: notes,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      })
    } catch (error) {
      console.log("Error fetching notes:", error)
      throw new HTTPException(500, { message: "Failed to fetch notes" })
    }
  })
  .get("/:id", zValidator("param", noteIdSchema), getAuthUser, async (c) => {
    try {
      const user = c.get("user")
      const { id } = c.req.valid("param")

      const note = await prisma.note.findFirst({
        where: {
          id: id,
          userId: user.id,
        },
      })

      if (!note) {
        throw new HTTPException(404, { message: "Note not found" })
      }

      return c.json({
        success: true,
        data: note,
      })
    } catch (error) {
      console.log("Error fetching note:", error)
      throw new HTTPException(500, { message: "Failed to fetch note" })
    }
  })
