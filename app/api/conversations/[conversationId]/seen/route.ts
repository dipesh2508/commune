import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParams {
  conversationId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUseer = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUseer) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await prisma?.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Not Found", { status: 404 });
    }

    //Find the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    //update the seen status of the last message
    const updatedMessage = await prisma?.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        seen: true,
        sender: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUseer.id,
          },
        },
      },
    });

    return NextResponse.json(updatedMessage);
  } catch (e: any) {
    console.error(e, "Error Messages seen");
    return new Response("Error", { status: 500 });
  }
}
