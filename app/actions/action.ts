import { myProvider } from "@/lib/ai/providers"
import { generateText, type UIMessage } from "ai"

export async function generateTitleForUserMessage({
  message,
}: {
  message: UIMessage
}) {
  try {
    const { text } = await generateText({
      model: myProvider.languageModel("title-model"),
      system: `\n
                     - you will generate a short title based on the first message a user begins a conversation with
                     - ensure it is not more than 80 characters long
                     - the title should be a summary of the user's message
                     - do not use quotes or colons`,
      prompt: JSON.stringify(message),
    })

    return text
  } catch (error) {
    console.log("Error generating title for user message:", error)
    return "Untitled"
  }
}
