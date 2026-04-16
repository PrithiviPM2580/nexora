import { z } from "zod"

export const createNoteSchema = z.object({
  title: z.string().describe("The title of the note to be created"),
  content: z.string().describe("The content of the note to be created"),
})

export const searchNoteSchema = z.object({
  query: z
    .string()
    .describe("Search query to find relevant notes based on title or content"),
  limit: z
    .number()
    .optional()
    .describe("The maximum number of search results to return (default 10)"),
})

export const webSearchSchema = z.object({
  query: z.string().describe("The search query to look up on the web"),
})

export const extractWebUrlSchema = z.object({
  urls: z
    .array(z.string().describe("The URLs to extract content from"))
    .describe("An array of URLs to extract content from"),
})

export type CreateNoteToolType = z.infer<typeof createNoteSchema>
export type SearchNoteToolType = z.infer<typeof searchNoteSchema>
export type WebSearchToolType = z.infer<typeof webSearchSchema>
export type ExtractWebUrlToolType = z.infer<typeof extractWebUrlSchema>
