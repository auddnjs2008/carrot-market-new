'use client'

import { useFormState, useFormStatus } from 'react-dom';
import Input from './input';
import { createComment } from '@/app/posts/[id]/actions';
import Image from 'next/image';
import React, { useOptimistic } from 'react';
import CommentFormInput from './comment-form-Input';

interface CommentListInput {
    comments: ({
        user: {
            username: string;
            avatar: string | null;
        };
    } & {
        id: number;
        payload: string;
        created_at: Date;
        updated_at: Date;
        userId: number;
        postId: number;
    })[],
    postId: number;
    user: {
        username: string;
        avatar: string | null;
        id: number;
    }
};

export type OptimisticComment = {
    payload: string;
    user: {
        username: string;
        avatar: string | null;
    }
}

const CommentListInput = ({ comments, postId, user }: CommentListInput) => {

    const [optimisticComments, reducerFn] = useOptimistic(comments, (previousState: OptimisticComment[], payload: OptimisticComment) => {
        return [...previousState, payload];
    })

    return (
        <div className='border my-10 space-y-5'>
            <ul className='h-[500px] border  p-5 overflow-y-scroll  flex flex-col gap-3'>
                {optimisticComments!.map((item, index) => <li key={index} className='flex  gap-10 items-center'>
                    <div className='flex flex-col items-center text-sm  gap-1'>
                        <div className='size-10 relative rounded-full bg-neutral-100 overflow-hidden' >
                            {item.user.avatar && <Image fill src={item.user.avatar} alt='avatar' />}
                        </div>
                        <span>{item.user.username}</span>
                    </div>
                    <div className='flex-1'>
                        {item.payload}
                    </div>

                </li>)}
            </ul>
            <CommentFormInput reducerFn={reducerFn} postId={postId} user={user} />
        </div>
    )
}

export default (CommentListInput);