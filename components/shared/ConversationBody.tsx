"use client"

import useConversation from "@/hooks/useConversation"
import { FullMessageType } from "@/types"
import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox"
import axios from "axios"

interface ConversationBodyProps {
  initialMessages: FullMessageType[]
}

const ConversationBody: React.FC<ConversationBodyProps> = ({
  initialMessages
}) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {conversationId} = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto">
      <div ref={bottomRef} className="pt-24">
        {messages.map((message, i) => (
          <MessageBox
          isLast={i===messages.length-1}
          key={message.id}
          data={message}
        />
        ))}
      </div>
    </div>
  )
}

export default ConversationBody