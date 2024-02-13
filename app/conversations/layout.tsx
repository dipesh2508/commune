import getConversations from "@/actions/getConversations";
import ConversationList from "@/components/conversations/ConversationList";
import Sidebar from "@/components/shared/Sidebar";
import getUsers from "@/actions/getUsers";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList 
          users={users} 
          title="Messages" 
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}
