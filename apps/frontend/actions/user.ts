"use server"

import { auth,signIn } from "@/auth"
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
            imageUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${fullName}`,
            stream: {
                create:{
                    name: `${fullName}'s stream`
                }
            }
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

export const getSelf = async () => {
    try {
        const session = await auth();

        if(!session?.user) return null;

        const user = await prisma.user.findUnique({
            where:{
                id: session?.user?.id
            }
        })

        return user
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getAllCreators = async () => {
    const self = await getSelf();
    const someCreators = await prisma.user.findMany({
        where:{
            AND: [
                {
                    NOT:{
                        id: self?.id
                    }
                },
                {
                    // Hamne jise block kiya hai use hata do
                    blockedBy: {
                        none:{
                            blockerId: self?.id
                        }
                    }
                },
                {
                    // Ham logon ko jisne bhi block kiya hai usko bhi hata do
                    blocking: {
                        none:{
                            blockedId: self?.id
                        }
                    }
                }
            ],
            
        },
        take:5
    })
    return someCreators;
}

export const getUserById = async (id:string) => {
    const user = await prisma.user.findUnique({
        where:{id}
    });

    if(!user) throw new Error("User Doesn't Exists.");

    return user;
}