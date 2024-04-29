import { ChatRoomListType } from '@/app/(tabs)/chat/page';
import { formatToTimeAgo } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';


interface Props {
    chatRooms: ChatRoomListType;
    userId: number;
}


const ChatList: React.FC<Props> = ({ chatRooms, userId }) => {

    return (
        <div className='border my-10 space-y-5'>
            <ul className=' border p-5  flex flex-col gap-3'>
                {chatRooms!.map((room, index) =>
                    <Link key={index} href={`/chat/${room.id}`}>
                        <li className='flex items-center border  p-3'>
                            <div className='grid grid-cols-2'>
                                {room.users.filter(user => user.id !== userId).map((user, index) => <div key={index} className='size-8 bg-slate-500 relative rounded-full overflow-hidden'>
                                    {user.avatar ? <Image fill src={user.avatar} alt='user-avatar' /> : ''}
                                </div>)}
                            </div>
                            <div className='text-gray-400 flex w-full items-center justify-between'>
                                <span>{room.messages[0]?.payload}</span>
                                <span className='text-xs'>{(room.messages[0]?.created_at.toString().split(' (K')[0])}</span>
                            </div>
                        </li>
                    </Link>
                )}
            </ul>
        </div>
    )
}

export default ChatList;