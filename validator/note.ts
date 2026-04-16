import { z } from "zod"

export const noteSchema = z.object({
  title: z.string().min(1),
  content: z.string(),
})

export const noteIdSchema = z.object({
  id: z.string().min(1, "Note ID is required"),
})

export const noteUpdateSchema = noteSchema.partial()

export type Note = z.infer<typeof noteSchema>
export type NoteId = z.infer<typeof noteIdSchema>
export type NoteUpdate = z.infer<typeof noteUpdateSchema>
