import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { chatIdSchema, chatSchema } from "@/validator/chat"
import { getAuthUser } from "@/lib/hono/hono-middleware"
import { HTTPException } from "hono/http-exception"
import { prisma } from "@/lib/prisma"
import { generateTitleForUserMessage } from "@/app/actions/action"
import { createNote } from "@/lib/ai/tools/create-note"
import { searchNote } from "@/lib/ai/tools/search-note"
import { webSearch } from "@/lib/ai/tools/web-search"
import { extractWebUrl } from "@/lib/ai/tools/extract-url"
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  UIMessage,
  UIMessagePart,
} from "ai"
import { isProduction } from "better-auth"
import { myProvider } from "@/lib/ai/providers"
import { DEVELOPMENT_MODEL_ID } from "@/lib/ai/models"
import { generateUUID } from "@/lib/utils"
import { getSystemPrompt } from "@/lib/ai/prompt"

export const chatRoute = new Hono()
  .post("/", zValidator("json", chatSchema), getAuthUser, async (c) => {
    try {
      const user = c.get("user")
      const { id, message, selectedModelId, selectedToolName } =
        c.req.valid("json")

      let chat = await prisma.chat.findUnique({
        where: {
          id,
        },
      })

      if (!chat) {
        const title = await generateTitleForUserMessage({ message })
        chat = await prisma.chat.create({
          data: {
            id,
            userId: user.id,
            title: title,
          },
        })
      }

      const messagesFromDB = await prisma.message.findMany({
        where: {
          chatId: chat.id,
        },
        orderBy: { createdAt: "desc" },
      })

      const mapUiMessage: UIMessage[] = messagesFromDB.map((m) => ({
        id: m.id,
        role: m.role as "user" | "assistant" | "system",
        parts: m.parts as UIMessagePart<any, any>[],
        metadata: {
          createdAt: m.createdAt,
        },
      }))

      const newUiMessage = [...mapUiMessage, message]

      const modelMessages = await convertToModelMessages(newUiMessage)

      await prisma.message.create({
        data: {
          id: message.id,
          chatId: id,
          role: "user",
          parts: JSON.parse(JSON.stringify(message.parts)),
        },
      })

      const modelProvider = isProduction
        ? myProvider.languageModel(selectedModelId)
        : myProvider.languageModel(DEVELOPMENT_MODEL_ID)

      const result = streamText({
        model: modelProvider,
        system: getSystemPrompt(selectedToolName),
        messages: modelMessages,
        tools: {
          createNote: createNote(user.id),
          searchNote: searchNote(user.id),
          webSearch: webSearch(),
          extractWebUrl: extractWebUrl(),
        },
        stopWhen: stepCountIs(5),
        toolChoice: "auto",
        onError: (error) => {
          console.log("Streaming error:", error)
        },
      })

      return result.toUIMessageStreamResponse({
        sendSources: true,
        originalMessages: newUiMessage,
        onFinish: async ({ messages, responseMessage }) => {
          console.log("Complete messages: ", messages.length, responseMessage)
          try {
            await prisma.message.createMany({
              data: messages.map((m) => ({
                id: m.id || generateUUID(),
                chatId: id,
                role: m.role,
                parts: JSON.parse(JSON.stringify(m.parts)),
                updatedAt: new Date(),
                createdAt: new Date(),
              })),
              skipDuplicates: true,
            })
          } catch (error) {
            console.log("Error saving messages to DB: ", error)
          }
        },
      })
    } catch (error) {
      console.error("Error handling chat request:", error)
      throw new HTTPException(500, { message: "Internal Server Error" })
    }
  })
  .get("/", getAuthUser, async (c) => {
    try {
      const user = c.get("user")
      const chats = await prisma.chat.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      })

      return c.json({
        success: true,
        data: chats,
      })
    } catch (error) {
      console.log("Error fetching chats: ", error)
      throw new HTTPException(500, { message: "Internal Server Error" })
    }
  })
  .get("/:id", zValidator("param", chatIdSchema), getAuthUser, async (c) => {
    try {
      const user = c.get("user")
      const { id } = c.req.valid("param")

      const chat = await prisma.chat.findFirst({
        where: { id, userId: user.id },
        include: {
          messages: {
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: { createdAt: "desc" },
      })

      if (!chat) {
        return c.json({ success: true, data: {} })
      }

      const uiMessages: UIMessage[] = chat.messages.map((m) => ({
        id: m.id,
        role: m.role as "user" | "assistant" | "system",
        parts: m.parts as UIMessagePart<any, any>[],
        metadata: { createdAt: m.createdAt },
      }))

      const chatWithMsg = {
        ...chat,
        messages: uiMessages,
      }

      return c.json({
        success: true,
        data: chatWithMsg,
      })
    } catch (error) {}
  })
