"use server"

import { signIn } from "@/auth"
import { redirect } from "next/navigation"
import {prisma} from "@repo/db"
import {hash} from "bcryptjs"

export const register = async (formData: FormData) => {
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if(!fullName || !email || !password || !confirmPassword){
        throw new Error("All fields are required");
    }

    if(password!==confirmPassword){
        throw new Error("Pasword doesn't matched");
    }

    const existingUser = await prisma.user.findUnique({where:{email}});
    if(existingUser) throw new Error("User already Exists. Try logging in...");

    const hashedPassword = await hash(password,10);
    const user = await prisma.user.create({
        data:{
            name:fullName,
            email:email,
            password: hashedPassword,
            imageUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${fullName}`
        }
    })
    // console.log(user)
    
    redirect('/login')
}

export const login = async (formData:FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    await signIn("credentials",{
        email:email,
        password:password,
        redirectTo:'/dashboard'
    });
}