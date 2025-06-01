import { prisma } from "@repo/db";
import { getSelf } from "@/actions/user"

export const isFollowingCreator = async (id:string) => {
    try {
        const self = await getSelf();

        if(!self) return false;
    
        const creatorExists = await prisma.user.findUnique({
            where:{id}
        })

        if(!(!!creatorExists)){
            return false;
        }

        if(self.id === creatorExists.id) return true;

        const isFollowing = await prisma.follow.findFirst({
            where:{
                followerId: self?.id,
                followingId: creatorExists.id
            }
        })

        return !!isFollowing;
    } catch (error) {
        console.log(error);
        return false
    }
}

export const handleFollow = async (creatorId:string) => {
    const self = await getSelf();

    if(!self) throw new Error("Login first, to continue.");

    const creator = await prisma.user.findUnique({
        where:{id: creatorId}
    });

    if(!creator) throw new Error("Creator Doesn't exists.");

    const isAlreadyFollowing = await prisma.follow.findFirst({
        where:{
            followerId: self?.id,
            followingId: creator.id
        }
    })

    if(isAlreadyFollowing || self.id === creator.id) throw new Error("User already following.");

    const follow = await prisma.follow.create({
        data:{
            followerId: self.id,
            followingId: creator.id
        },
        include:{
            follower:true,
            following:true
        }
    })

    return follow;
}

export const unfollowUser = async (id:string) => {
    const self = await getSelf();

    if(!self) throw new Error("Try Logging in first.");

    const creator = await prisma.user.findUnique({
        where:{id}
    });

    if(!creator) throw new Error("Creator doesn't exists.");

    const isAlreadyFollowing = await prisma.follow.findFirst({
        where:{
            followerId: self.id,
            followingId: creator.id
        }
    })

    if(!isAlreadyFollowing || (self.id === creator.id)) throw new Error("Already Following");

    const unfollow = await prisma.follow.delete({
        where:{
            id: isAlreadyFollowing.id
        },
        include:{
            following:true
        }
    })

    return unfollow;
}