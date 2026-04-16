export interface ChatModel {
  id: string
  name: string
  description: string
}

export const chatModels: ChatModel[] = [
  {
    id: "google/gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description:
      "Deepest reasoning and highest accuracy. Best for research, coding, STEM, and complex multimodal tasks.",
  },
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    description:
      "Balanced power and speed. Ideal for chatbots, summarization, and general-purpose assistants.",
  },
  {
    id: "google/gemini-2.5-flash-preview-09-2025",
    name: "Gemini 2.5 Flash Preview (09-2025)",
    description:
      "Latest Flash updates for testing new features. Not recommended for production use.",
  },
  {
    id: "google/gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash Lite",
    description:
      "Fastest and most cost-efficient. Suitable for high-traffic bots and lightweight tasks.",
  },
  {
    id: "google/gemini-2.5-flash-lite-preview-09-2025",
    name: "Gemini 2.5 Flash Lite Preview (09-2025)",
    description:
      "Experimental low-latency version for benchmarking. May lack stability for critical applications.",
  },
  {
    id: "google/gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    description:
      "Balanced power and speed. Ideal for chatbots, summarization, and general-purpose assistants.",
  },
]

export const DEFAULT_MODEL_ID = chatModels[0].id
export const DEVELOPMENT_MODEL_ID = chatModels[5].id

export const MODEL_OPTIONS = chatModels.map((model) => ({
  value: model.id,
  label: model.name,
}))
