import { prisma } from "@/lib/prisma"
import { searchNoteSchema } from "@/validator/tool"
import { tool } from "ai"

export const searchNote = (userId: string) =>
  tool({
    description:
      "Search through the user's notes by keywords in title or content. Use this when the user asks to find or search or lookup notes.",
    inputSchema: searchNoteSchema,
    execute: async ({ query, limit = 10 }) => {
      console.log("SEARCH NOTE TOOL CALL")
      try {
        const notes = await prisma.note.findMany({
          where: {
            userId,
            OR: [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                content: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
          orderBy: { createdAt: "desc" },
          take: limit,
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
          },
        })

        return {
          success: true,
          message: `Found ${notes.length} notes matching the query "${query}"`,
          notes: notes,
        }
      } catch (error) {
        return {
          success: false,
          message: "Failed to search notes..",
          error: error instanceof Error ? error.message : "Unknown error",
        }
      }
    },
  })
