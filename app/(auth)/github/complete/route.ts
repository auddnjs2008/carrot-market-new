import getUserProfile from '@/app/service/getUserProfile';
import db from '@/lib/db';
import logined from '@/lib/logined';
import getSession from '@/lib/session';
import getAccessToken from "@/app/service/getAccessToken";
import { notFound, redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request:NextRequest){
    const code = request.nextUrl.searchParams.get('code');
    
    if(!code){
        return notFound();
    }
    
    const {error,access_token}= await getAccessToken(code);

    if(error){
    
        return new Response(null,{
            status:400
        })
    }
   
    const {id,avatar_url,login}= await getUserProfile(access_token);

    

    const user = await db.user.findUnique({
        where:{
            github_id:id+"",
        },
        select:{
            id:true
        }
    });

    if(user){
        await logined(user.id);
         redirect('/profile');
    }
    /** 같은 이름이 있는지 확인해야 한다. */
    const sameNameUser = await db.user.findFirst({
        where:{
            username:login
        },
        select:{
            id:true
        }
    })

    const isExistSameNameUser = Boolean(sameNameUser);


    const newUser = await db.user.create({
        data:{
            username:isExistSameNameUser ? `${login}(github)`  : login,
            github_id:id+"",
            avatar:avatar_url
        },
        select:{
            id:true
        }
    }) ;

    await logined(newUser.id);
    redirect('/profile');
    
}