'use client'
import { saveMessage } from '@/app/chat/[id]/action';
import { InitialChatMessages } from '@/app/chat/[id]/page'
import { formatToTimeAgo } from '@/lib/utils';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import { RealtimeChannel, createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

interface ChatMessageListProps {
    initialMessages: InitialChatMessages;
    chatRoomId: string;
    userId: number;
    username: string;
    avatar: string;
}
const SUPABASE_PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpemd1dGtzZ3Bic29vcHVtdXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxOTQ3NTQsImV4cCI6MjAyOTc3MDc1NH0.1ZXxDQc-5mhVNBqDII_OgwXqCnpwQ_WneNtgDP_YrBk'
const SUPABASE_URL = 'https://aizgutksgpbsoopumuzs.supabase.co'

export default function ChatMessageList({ initialMessages, userId, chatRoomId, username, avatar }: ChatMessageListProps) {
    const [messages, setMessages] = useState(initialMessages);
    const [message, setMessage] = useState('');
    const channel = useRef<RealtimeChannel>();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value }
        } = event;

        setMessage(value);
    }

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // alert(message);
        setMessages(prevMsgs => [...prevMsgs, {
            id: Date.now(),
            payload: message,
            created_at: new Date(),
            userId,
            user: {
                username: "string",
                avatar: "xxxx",
            }
        }])
        channel.current?.send({
            type: 'broadcast',
            event: 'message',
            payload: {
                id: Date.now(), payload: message, created_at: new Date(), userId,
                user: {
                    username,
                    avatar,
                }
            }
        })

        await saveMessage(message, chatRoomId);


        setMessage('');
    }

    useEffect(() => {
        const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
        channel.current = client.channel(`room-${chatRoomId}`);
        channel.current.on('broadcast', { event: 'message' }, (payload) => {
            console.log(payload);
            setMessages(prevMsgs => [...prevMsgs, payload.payload])
        }).subscribe();

        return () => {
            channel.current?.unsubscribe();
        }
    }, [])


    return (
        <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex gap-2 items-start ${message.userId === userId ? "justify-end" : ""
                        }`}
                >
                    {message.userId === userId ? null : (
                        <Image
                            src={message.user.avatar!}
                            alt={message.user.username}
                            width={50}
                            height={50}
                            className="size-8 rounded-full"
                        />
                    )}
                    <div
                        className={`flex flex-col gap-1 ${message.userId === userId ? "items-end" : ""
                            }`}
                    >
                        <span
                            className={`${message.userId === userId ? "bg-neutral-500" : "bg-orange-500"
                                } p-2.5 rounded-md`}
                        >
                            {message.payload}
                        </span>
                        <span className="text-xs">
                            {formatToTimeAgo(message.created_at.toString())}
                        </span>
                    </div>
                </div>
            ))}
            <form className="flex relative" onSubmit={onSubmit}>
                <input
                    required
                    onChange={onChange}
                    value={message}
                    className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
                    type="text"
                    name="message"
                    placeholder="Write a message..."
                />
                <button className="absolute right-0">
                    <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300" />
                </button>
            </form>
        </div>
    );
}