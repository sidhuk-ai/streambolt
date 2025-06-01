"use server"

import { handleFollow, unfollowUser } from "@/lib/follow-service"
import { revalidatePath } from "next/cache"

export const onFollow = async (id:string) => {
    try {
        const followed = await handleFollow(id)

        revalidatePath('/');

        if(followed){
            revalidatePath(`/creator/${followed.following.id}`)
        }

        return followed;
    } catch (error) {
        throw new Error("Internal Error.")
    }
}

export const onUnfollow =  async (id:string) => {
    try {
        const unfollowed = await unfollowUser(id);

        revalidatePath('/');

        if(unfollowed){
            revalidatePath(`/creator/${unfollowed.following.id}`)
        }

        return unfollowed
    } catch (error) {
        throw new Error("Internal error.");
    }
}