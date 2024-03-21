"use client"

import useConversation from "@/hooks/useConversation"
import { FullMessageType } from "@/types"
import { useRef, useState } from "react"
import MessageBox from "./MessageBox"

interface ConversationBodyProps {
  initialMessages: FullMessageType[]
}

const ConversationBody: React.FC<ConversationBodyProps> = ({
  initialMessages
}) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {conversationId} = useConversation();
  return (
    <div className="flex-1 overflow-y-auto">
      <div ref={bottomRef} className="pt-24">
        {messages.map((message, i) => (
          <MessageBox
          inLast={i===messages.length-1}
          key={message.id}
          data={message}
        />
        ))}
      </div>
    </div>
  )
}

export default ConversationBody