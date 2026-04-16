import { UseChatHelpers } from "@ai-sdk/react"
import { ChatStatus, UIMessage } from "ai"
import React, { Dispatch, SetStateAction, useCallback } from "react"
import { PromptInput, PromptInputTextarea, PromptInputTools} from "../ai-elements/prompt-input"
import { cn } from "@/lib/utils"

type ChatInputProps = {
  chatId: string
  input: string
  className?: string
  setInput: Dispatch<SetStateAction<string>>
  status: ChatStatus
  messages: Array<UIMessage>
  setMessages: UseChatHelpers<UIMessage>["setMessages"]
  sendMessage: UseChatHelpers<UIMessage>["sendMessage"]
  initialModelId: String
  stop: () => void
}

function ChatInput({
  chatId,
  input,
  className,
  setInput,
  status,
  messages,
  setMessages,
  sendMessage,
  initialModelId,
  stop,
}: ChatInputProps) {
  const isgenerating = status === "ready" || status === "submitted"
  const placeholder = "Ask, search or create note..."
  const selectedModelId= initialModelId;
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVlaue = e.target.value
    setInput(newVlaue)
  }
  const onSubmit = useCallback(() => {}, [])

  return (
    <PromptInput
      className={cn(
        "relative divide-y-0 rounded-3xl bg-white pb-2 shadow-md ring-border dark:bg-[#242628] dark:shadow-black/5",
        className && className
      )}
      onSubmit={onSubmit}
    >
      <div className="relative">
        <PromptInputTextarea
          placeholder={placeholder}
          rows={2}
          autoFocus
          value={input}
          onChange={handleInputChange}
          className="min-h-16 overflow-hidden pt-2 text-sm"
        />
      </div>

      <PromptInputTools>
        <ModelSelector selectedModelId={selectedModelId} />
      </PromptInputTools>
    </PromptInput>
  )
}

function Modelselector(props:{
    selectedModelId: String;
    onSelect:()=>void
}){
    return <>
     <PromptModel
    </>
}

export default ChatInput
