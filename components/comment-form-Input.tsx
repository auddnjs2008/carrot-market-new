'use client'

import { useFormState } from 'react-dom';
import Input from './input'
import { createComment } from '@/app/posts/[id]/actions';
import { useOptimistic } from 'react';
import { OptimisticComment } from './comment-list';


type Props = {
    reducerFn: (action: OptimisticComment) => void
    postId: number;
    user: {
        username: string;
        avatar: string | null;
        id: number;
    }
}



const CommentFormInput: React.FC<Props> = ({ reducerFn, postId, user }) => {

    const interceptCommentSubmit = async (previousState: any, formData: FormData) => {
        const newComment = {
            key: Math.random(),
            payload: String(formData.get('comment')),
            user: {
                username: user?.username ?? '',
                avatar: user?.avatar ?? ''
            }
        }

        reducerFn(newComment);

        formData.set('postId', String(postId));
        formData.set('userId', String(user.id!));

        return await createComment(previousState, formData);
    }

    const [state, action] = useFormState(interceptCommentSubmit, null);
    console.log(state, 'state');

    return (
        <form action={action}  >
            <Input type='text' name='comment' placeholder='댓글을 입력해주세요' required
            // errors={state?.fieldErrors.comment} 
            />
        </form>
    )

}

export default CommentFormInput