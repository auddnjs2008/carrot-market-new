'use server'
import db from '@/lib/db';
import getSession from '@/lib/session';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

export const likePost = async (postId:number) => {
    'use server'
    await new Promise((r) => setTimeout(r, 3500))
    const session = await getSession();
    try {
        await db.like.create({
            data: {
                postId: postId, userId: session.id!
            }
        })
        revalidateTag(`like-status-${postId}`);
    } catch (e) {

    }
}

export const dislikePost = async (postId:number) => {
    'use server';

    await new Promise((r) => setTimeout(r, 3500))
    try {
        const session = await getSession();
        await db.like.delete({
            where: {
                id: { postId: postId, userId: session.id! }
            }
        })
        revalidateTag(`like-status-${postId}`);


    } catch (e) {

    }
}


const commentFormSchema = z.object({
    comment:z.string({
        required_error:'comment is required'
    })
})


export const createComment = async (prevState:any,formData:FormData) => {
   
    const data = {
        comment:formData.get('comment'),
        postId:formData.get('postId'),
        userId:formData.get('userId')
    }

    const result  = await commentFormSchema.spa(data);

    
  

    if(!result.success){
        return result.error.flatten();
    }else{
       await db.comment.create({
         data:{
            payload:result.data.comment,
            postId:+formData.get('postId')!,
            userId:+formData.get('userId')!
         }
       })
       revalidateTag(`posts-comments-${formData.get('postId')}`)
    }

}