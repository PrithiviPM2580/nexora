import { customProvider } from "ai"
import { chatModels, DEVELOPMENT_MODEL_ID } from "./models"
import { gateway } from "@ai-sdk/gateway"
import { google } from "@ai-sdk/google"

const NODE_ENV = process.env.NODE_ENV!
export const isProduction = NODE_ENV === "production"

const createLanguageModel = () => {
  const models: Record<string, any> = {}
  chatModels.forEach((model) => {
    models[model.id] = gateway.languageModel(model.id)
  })

  models[DEVELOPMENT_MODEL_ID] = google.languageModel(DEVELOPMENT_MODEL_ID)
  models["title-model"] = isProduction
    ? gateway.languageModel("google/gemini-2.0-flash")
    : google.languageModel(DEVELOPMENT_MODEL_ID)

  return models
}

export const myProvider = customProvider({
  languageModels: createLanguageModel(),
})
