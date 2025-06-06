"use server";
import { prisma, Stream } from "@repo/db";
import { getSelf } from "./user";
import { revalidatePath } from "next/cache";

export const updateStream = async (values: Partial<Stream>) => {
    try {
        const self = await getSelf();
        const selfStream = await prisma.stream.findUnique({
            where:{
                userId: self?.id
            }
        })
        if(!selfStream) throw new Error("No stream was found.");

        const valiData = {
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatDelayed: values.isChatDelayed,
            isChatFollowersOnly: values.isChatFollowersOnly
        };
        const updateStream = await prisma.stream.update({
            where:{
                id: selfStream.id
            },
            data:{
                ...valiData
            }
        })

        revalidatePath("/dashboard/chats");
        revalidatePath("/dashboard");
        revalidatePath(`/creator/${self?.id}`);
        return updateStream;
    } catch {
        throw new Error("Internal Error while updating stream settings.");
    }
}