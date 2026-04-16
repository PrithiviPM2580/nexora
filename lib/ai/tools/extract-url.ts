import { extractWebUrlSchema } from "@/validator/tool"
import { tool } from "ai"
import { tavily } from "@tavily/core"

const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY! })

export const extractWebUrl = () =>
  tool({
    description:
      "Extract content from one or more URLs. Use this to retrieve, summarize, URL, title,content, and favicon.",
    inputSchema: extractWebUrlSchema,
    execute: async ({ urls }) => {
      try {
        const response = await tavilyClient.extract(urls, {
          includeFavicon: true,
          includeImages: false,
          format: "markdown",
          extractDepth: "basic",
          topic: "general",
          maxResults: 3,
        })

        const results = (response.results || []).map((r) => ({
          url: r.url,
          content: r.rawContent || "No content extracted",
          favicon: r.favicon || null,
        }))

        return {
          success: true,
          aurls: urls,
          results: results,
        }
      } catch (error) {
        return {
          success: false,
          message: "Extract url content failed..",
          error: error instanceof Error ? error.message : "Unknown error",
        }
      }
    },
  })
