import { z } from "zod"
import { type UIMessage } from "ai"
import { ChatModel } from "@/lib/ai/models"

export const chatSchema = z.object({
  id: z.string().min(1, "Chat ID is required"),
  message: z.custom<UIMessage>(),
  selectedModelId: z.string() as z.ZodType<ChatModel["id"]>,
  selectedToolName: z.string(),
})

export const chatIdSchema = z.object({
  id: z.string().min(1, "Chat ID is required"),
})

export type ChatType = z.infer<typeof chatSchema>
export type ChatIdType = z.infer<typeof chatIdSchema>
