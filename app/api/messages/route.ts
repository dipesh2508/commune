import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";


export async function POST(
    request: Request,
  ) {
    try {
      const currentUser = await getCurrentUser();
      const body = await request.json();
      const {
        message,
        image,
        conversationId
      } = body;
  
      if (!currentUser?.id || !currentUser?.email) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
  
      const newMessage = await prisma.message.create({
        include: {
          seen: true,
          sender: true
        },
        data: {
          body: message,
          image: image,
          conversation: {
            connect: { id: conversationId }
          },
          sender: {
            connect: { id: currentUser.id }
          },
          seen: {
            connect: {
              id: currentUser.id
            }
          },
        }
      });
  
      
      const updatedConversation = await prisma.conversation.update({
        where: {
          id: conversationId
        },
        data: {
          lastMessageAt: new Date(),
          messages: {
            connect: {
              id: newMessage.id
            }
          }
        },
        include: {
          users: true,
          messages: {
            include: {
              seen: true
            }
          }
        }
      });

      await pusherServer.trigger(conversationId, 'messages:new', newMessage)

      const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];
      
      updatedConversation.users.map(async (user)=> {
        await pusherServer.trigger(user.email!, 'conversations:update', {
          id: conversationId,
          messages: [lastMessage]
        })
      });

    return NextResponse.json(newMessage);
  } catch (e: any) {
    console.error(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
