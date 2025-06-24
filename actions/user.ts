"use server";

import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const register = async (formData: FormData) => {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if(!firstName || !lastName || !email || !password || !confirmPassword) throw new Error("All fields are required.");
    if(password !== confirmPassword) throw new Error("Password didn't matched.");

    const existingUser = await prisma.user.findUnique({
        where:{email}
    })
    if(existingUser) throw new Error("User already exists. Go back to Login");

    const hashedPassword = await hash(password,10);
    const fullName = `${firstName} ${lastName}`
    const username = `user-${Date.now().toString().slice(-5)}`
    await prisma.user.create({
        data:{
            name: fullName,
            username,
            email,
            password: hashedPassword,
            imageUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${fullName}`,
            stream: {
                create:{
                    name: `${fullName}'s Stream`
                }
            }
        }
    })
    redirect('/login')
}

export const login = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if(!email || !password) throw new Error("All fields are required.");

    await signIn("credentials",{
        email: email,
        password: password,
        redirectTo: '/dashboard'
    });
    revalidatePath('/dashboard');
}

export const getSelf = async () => {
    try {
        const session = await auth();

        if(!session?.user) throw new Error("Your session was not found. Try Logging in again.");

        const user = await prisma.user.findUnique({
            where:{
                id: session.user.id
            },
            select:{
                id: true,
                name: true,
                username: true,
                email: true,
                imageUrl: true
            }
        })

        return user;
    } catch (error) {
        throw new Error("User didn't logged in.")
    }
}

export const getAllCreators = async () => {
    let someCreators;
    try {
        const self = await getSelf();
        someCreators = await prisma.user.findMany({
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
            take:5,
            include:{
                stream:{
                    select: {
                        isLive: true
                    }
                }
            }
        })
    } catch (error) {
        someCreators = await prisma.user.findMany({
            include:{
                stream:{
                    select:{
                        isLive: true,
                    }
                }
            },
            take: 5
        })
    }
    return someCreators;
}

export const getUserById = async (id:string) => {
    const user = await prisma.user.findUnique({
        where:{id},
        select:{
            id: true,
            name: true,
            email: true,
            imageUrl: true,
            username: true,
            createdAt: true,
            emailVerified: true,
            stream: {
                select:{
                    name: true,
                    isLive: true,
                    isChatDelayed: true,
                    isChatEnabled: true,
                    isChatFollowersOnly: true,
                    thumbnailUrl: true
                }
            }
        }
    });

    if(!user) throw new Error("User Doesn't Exists.");

    return user;
}

export const updateUserValues = async (formData: FormData) => {
    try {
        const self = await getSelf();

        if(!self) return;

        const validData = {
            name: formData.get('name') as string,
            username: formData.get('username') as string
        }

        const updatedData = await prisma.user.update({
            where:{
                id: self.id
            },
            data: {
                ...validData
            },
            select: {
                id: true
            }
        })

        if(!updatedData) return {msg: "Updation failed."}

        revalidatePath('/dashboard/settings');
        revalidatePath(`/stream/${updatedData.id}`);
        revalidatePath(`/creator/${updatedData.id}`)
        return;
    } catch (error) {
        return;
    }
}