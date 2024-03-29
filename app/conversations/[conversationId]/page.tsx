import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import ConversationBody from "@/components/conversations/ConversationBody";
import ConversationForm from "@/components/conversations/ConversationForm";
import ConversationHeader from "@/components/conversations/ConversationHeader";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex=col flex h-full">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full lg:pl-80">
      <div className="flex h-full flex-col">
        <ConversationHeader conversation={conversation} />
        <ConversationBody initialMessages={messages} />
        <ConversationForm />
      </div>
    </div>
  );
};

export default ConversationId;
