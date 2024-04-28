import ChatList from '@/components/chat-list';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { Prisma } from '@prisma/client';

const getChatRooms = async (userId: number) => {
    const chatRooms = await db.chatRoom.findMany({
        where: {
            users: {
                some: {
                    id: (userId)
                }
            }
        },
        include: {
            users: {
                select: {
                    avatar: true,
                    username: true,
                    id: true
                }
            },
            messages: {
                orderBy: {
                    id: 'desc'
                },
                take: 1
            }
        }
    })
    return chatRooms;
}


export type ChatRoomListType = Prisma.PromiseReturnType<typeof getChatRooms>;

const ChatPage = async () => {
    const session = await getSession();

    const chatRooms = await getChatRooms(session.id!);

    console.log(chatRooms[0].messages, 'chatRooms');
    return (
        <ChatList chatRooms={chatRooms} userId={session.id!} />
    )

}
export default ChatPage;