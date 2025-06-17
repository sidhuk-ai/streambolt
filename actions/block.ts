"use server";

import { blockUser, unBlockUser } from "@/lib/block-service"
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";
import { getSelf } from "./user";


const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id:string) => {
    const self = await getSelf();
    let blocked;

    try {
        blocked = await blockUser(id);
    } catch  {
        // Yaha aaya uska matlab user ek guest hai.
    }

    try {
        await roomService.removeParticipant(self?.id as string,id)
    } catch {
        // this means user is not in room
    }

    revalidatePath("/dashboard/community");
    return blocked;
}

export const onUnblock = async (id:string) => {
    try {
        const unblocked = await unBlockUser(id);
        revalidatePath("/");

        revalidatePath(`/creator/${id}`);
        return unblocked;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}