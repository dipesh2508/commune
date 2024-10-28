"use client";

import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "../shared/MessageBox";
import axios from "axios";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";

interface ConversationBodyProps {
  initialMessages: FullMessageType[];
}

const ConversationBody: React.FC<ConversationBodyProps> = ({
  initialMessages,
}) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    const messageHandler = async (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        
        return [...current, message];
      });
    };

    
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
        
        return currentMessage;
      }));
      bottomRef?.current?.scrollIntoView();
  }

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="pt-24">
        {messages.map((message, i) => (
          <MessageBox
            isLast={i === messages.length - 1}
            key={message.id}
            data={message}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ConversationBody;
