"use client"

import { DefaultChatTransport, UIMessage } from "ai"
import { useEffect, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { generateUUID } from "@/lib/utils"
import { DEFAULT_MODEL_ID } from "@/lib/ai/models"
import ChatInput from "./chat-input"

type ChatInterfaceProps = {
  chatId: string
  initialMessages: UIMessage[]
  initialLoading: boolean
  onlyInput: boolean
  inputDisabled?: boolean
}

function ChatInterface({
  chatId,
  initialMessages,
  initialLoading,
  onlyInput = false,
  inputDisabled,
}: ChatInterfaceProps) {
  const [input, setInput] = useState<string>("")
  console.log("ChatId", chatId)

  const { messages, setMessages, sendMessage, status, stop, error } =
    useChat<UIMessage>({
      id: chatId,
      messages: initialMessages,
      generateId: () => generateUUID(),
      transport: new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest({ messages, id, body }) {
          return {
            body: {
              id,
              message: messages.at(-1),
              selectedModelId: DEFAULT_MODEL_ID,
              ...body,
            },
          }
        },
      }),
      async onToolCall() {},
      onFinish: () => {},
      onError: (error) => {
        console.log("Chat error:", error)
      },
    })

  useEffect(() => {
    if (initialMessages && initialMessages?.length > 0) {
      setMessages(initialMessages)
    }
  }, [initialMessages, setMessages])

  if (onlyInput) {
    return <div className="relative w-full"></div>
  }

  return (
    <div className="flex h-screen min-w-0 flex-col overflow-x-hidden bg-background">
      <div className="sticky inset-y-1 bottom-1 z-1 mt-2 flex w-full gap-2 bg-background px-4 pb-1">
        <div className="relative mx-auto w-full md:max-w-3xl">
          <ChatInput
            chatId={chatId}
            input={input}
            className="w-full"
            setInput={setInput}
            messages={messages}
            status={status}
            stop={stop}
            initialModelId={DEFAULT_MODEL_ID}
            setMessages={setMessages}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
