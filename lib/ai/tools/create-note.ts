import { tool } from "ai"
import { createNoteSchema } from "@/validator/tool"
import { prisma } from "@/lib/prisma"

export const createNote = (userId: string) =>
  tool({
    description:
      "Createa note or save to note with the title and content. Use this when the user asks to create, save, or make a note.",
    inputSchema: createNoteSchema,
    execute: async ({ title, content }) => {
      console.log("REATE NOTE TOOL CALL")
      try {
        const note = await prisma.note.create({
          data: {
            userId,
            title: title,
            content: content,
          },
        })

        return {
          success: true,
          message: `Note ${title} created successfully with id ${note.id}`,
          noteId: note.id,
          title: note.title,
          content: note.content,
        }
      } catch (error) {
        return {
          success: false,
          message: "Failed to create note..",
          error: error instanceof Error ? error.message : "Unknown error",
        }
      }
    },
  })
