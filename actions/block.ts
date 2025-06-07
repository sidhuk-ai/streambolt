"use server";

import { blockUser, unBlockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache";

export const onBlock = async (id:string) => {
    //TODO: Adapt to disconnect from livestream
    //TODO: Allow ability to kick the guest
    try {
        const blocked = await blockUser(id);
        revalidatePath("/");

        revalidatePath(`/creator/${id}`);
        return blocked;
    } catch (error) {
        throw new Error((error as Error).message);
    }
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