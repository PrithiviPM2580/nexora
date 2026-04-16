import { z } from "zod"
import { type UIMessage } from "ai"
import { ChatModel } from "@/lib/ai/models"

export const chatSchema = z.object({
  id: z.string().min(1, "Chat ID is required"),
  message: z.custom<UIMessage>(),
  selectedModelId: z.string() as z.ZodType<ChatModel["id"]>,
  selectedToolName: z.custom().optional(),
})

export type ChatType = z.infer<typeof chatSchema>
