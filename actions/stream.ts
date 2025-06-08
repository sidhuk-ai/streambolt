"use server";
import { prisma } from "@/lib/db";
import { Stream } from "@/lib/generated/prisma";
import { getSelf } from "./user";
import { revalidatePath } from "next/cache";

export const updateStream = async (values: Partial<Stream>) => {
    // TODO: Rewrite whole logic
    try {
        const self = await getSelf();
        if(!self) throw new Error("You can't access this page, try Logging in first.");

        const selfStream = await prisma.stream.findUnique({
            where:{
                userId: self.id
            }
        });
        if(!selfStream) throw new Error("Stream not found.");

        const validData = {
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatDelayed: values.isChatDelayed,
            isChatFollowersOnly: values.isChatFollowersOnly
        }
        const updatedStream = await prisma.stream.update({
            where:{
                id: selfStream.id
            },
            data:{
                ...validData
            },
            select:{
                id: true,
                name: true,
                isChatDelayed: true,
                isChatEnabled: true,
                isChatFollowersOnly: true
            }
        })
        revalidatePath('/dashboard');
        revalidatePath('/dashboard/chats');
        revalidatePath(`/creator/${self.id}`);
        return updatedStream;
    } catch (error) {
        throw new Error('Error occured while updating stream settings.');
    }
}