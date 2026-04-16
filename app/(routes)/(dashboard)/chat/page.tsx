import { generateUUID } from "@/lib/utils"
import React from "react"
import ChatInterface from "@/components/chat"

async function Chat() {
  const id = generateUUID()
  return (
    <>
      <div className="relative w-full">
        <ChatInterface
          key={id}
          chatId={id}
          initialMessages={[]}
          initialLoading={false}
          onlyInput={false}
        />
      </div>
    </>
  )
}

export default Chat
