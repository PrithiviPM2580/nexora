"use client"

import { useState } from "react"

type ChatInterfaceProps = {
  chatId: string
  initialMessages: []
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
  return <div>ChatInterface</div>
}

export default ChatInterface
