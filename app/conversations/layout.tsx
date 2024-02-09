import ConversationList from "@/components/conversations/ConversationList";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
        <div className="h-full">
            <ConversationList initialItems={[]} />
            {children}
        </div>
    </Sidebar>
  );
}
