import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'

interface IParams {
    conversationId: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    try{
        const {conversationId} = params;
        const currentUser = await getCurrentUser();

        if(!currentUser){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const existingConversation = await prisma.conversation.findUnique(
            {
                where: {
                    id: conversationId
                },
                include: {
                    users: true
                }
            }
        );

        if(!existingConversation){
            return new NextResponse("Not Found", { status: 404 });
        }

        const deleteConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });

        return NextResponse.json(deleteConversation);

    } catch (error: any) {
        console.error(error, 'ERROR CONVERSATION DELETE');
        return new NextResponse("Internal Error", { status: 500 });
    }
}