interface IParams {
    conversationId: string;
}

const ConversationId = async({params}: {params: IParams}) => {

    return (
        <div>
        {params.conversationId}
        </div>
    )
}

export default ConversationId;