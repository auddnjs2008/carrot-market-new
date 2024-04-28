'use server'

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import bcrypt from 'bcrypt'
import getSession from '@/lib/session';


const checkEmailExists = async (email:string) => {
    const user = await db.user.findUnique({
        where:{
            email
        },
        select:{
            id:true
        }
    })

    return Boolean(user);

}

const formSchema = z
.object({
    email:z.string().email().toLowerCase().refine(checkEmailExists,"An account with this email does not exist"),
    password:z.string({
        required_error:'Password is required'
    }).min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR)   

}) 

export async function login(previousState:any,formData: FormData) {
    const data = {
        email:formData.get('email'),
        password:formData.get('password')
    };

    const result =await formSchema.spa(data);
    if(!result.success){
        console.log(result.error.flatten());
        return result.error.flatten();
    }else{
        // if the user is found, check password hash
        const user = await db.user.findUnique({
            where:{
                email:result.data.email
            },
            select:{
                id:true,
                password:true
            }
            })
            const ok = await bcrypt.compare(result.data.password,user!.password ?? "xxxx" );
            if(ok){
                const session  =await getSession();
                session.id = user!.id;
                await session.save();
                redirect('/profile');
            }else{
                return {
                    fieldErrors:{
                        password:["Wrong password."],
                        email:[]
                    }
                }
            }
        // log the user in
        // redirect '/profile'
    }
  
    // redirect('/');
 
}