import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { chatSchema } from "@/validator/chat"
import { getAuthUser } from "@/lib/hono/hono-middleware"
import { HTTPException } from "hono/http-exception"
import { prisma } from "@/lib/prisma"
import { generateTitleForUserMessage } from "@/app/actions/action"
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

export const chatRoute = new Hono().post(
  "/",
  zValidator("json", chatSchema),
  getAuthUser,
  async (c) => {
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
        system: "",
        messages: modelMessages,
        stopWhen: stepCountIs(5),
        toolChoice: "auto",
        onError: (error) => {
          console.log("Streaming error:", error)
        },
      })

      return result.toUIMessageStreamResponse({
        sendSources: true,
        onFinish: async ({ messages, responseMessage }) => {
          console.log("Complete messages: ", messages.length, responseMessage)
          try {
            await prisma.message.createMany({
              data: messages.map((m) => ({
                id: m.id || "",
                chatId: id,
                role: m.role,
                parts: JSON.parse(JSON.stringify(m.parts)),
                updatedAt: new Date(),
                createdAt: new Date(),
              })),
              skipDuplicates: true,
            })
          } catch (error) {}
        },
      })
    } catch (error) {
      console.error("Error handling chat request:", error)
      throw new HTTPException(500, { message: "Internal Server Error" })
    }
  }
)
