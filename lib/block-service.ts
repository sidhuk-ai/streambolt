import { getSelf } from "@/actions/user"
import { prisma } from "./db";

export const isBlockedByUser = async (id:string) => {
    try {
        const self = await getSelf();
        if(!self) return false;

        const creator = await prisma.user.findUnique({
            where:{id},
            select:{
                id:true
            }
        })
        if(!creator) throw new Error("Creator doesn't exists.");

        if(self.id === creator.id) return false;

        const isBlocked = await prisma.block.findUnique({
            where:{
                blockerId_blockedId:{
                    blockerId: self.id as string,
                    blockedId: creator.id
                }
            }
        })
        return !!isBlocked;
    } catch {
        return false;
    }
}

export const blockUser = async (id:string) => {
    const self = await getSelf();
    if(!self) throw new Error("Can't block. Try logging in.");

    const creator = await prisma.user.findUnique({
        where:{ id },
        select:{
            id: true
        }
    })
    if(!creator) throw new Error("User doesn't exists.");
    if(self.id === creator.id) throw new Error("Can't block yourself.");

    const existingBlock = await prisma.block.findUnique({
        where:{
            blockerId_blockedId:{
                blockerId: self.id as string,
                blockedId: creator.id
            }
        }
    })
    if(existingBlock) throw new Error("Is already blocked by you.");

    const block = await prisma.block.create({
        data:{
            blockerId: self.id as string,
            blockedId: creator.id
        },
        include:{
            blocked: {
                select:{
                    id: true,
                    name: true,
                    username: true,
                    imageUrl: true,
                    email: true
                }
            }
        }
    });
    return block;
}

export const unBlockUser = async (id:string) => {
    const self = await getSelf();
    if(!self) throw new Error("Can't unblock. Try logging in.");

    const creator = await prisma.user.findUnique({
        where:{ id },
        select:{
            id: true
        }
    })
    if(!creator) throw new Error("User doesn't exists.");
    if(self.id === creator.id) throw new Error("Can't unblock yourself.");

    const existingBlock = await prisma.block.findUnique({
        where:{
            blockerId_blockedId:{
                blockerId: self.id as string,
                blockedId: creator.id
            }
        }
    })
    if(!existingBlock) throw new Error("User isn't blocked by you.");

    const unblock = await prisma.block.delete({
        where:{
            blockerId_blockedId:{
                blockerId: self.id as string,
                blockedId: creator.id
            }
        },
        include:{
            blocked: {
                select:{
                    id:true,
                    name: true,
                    username: true,
                    imageUrl: true,
                    email: true
                }
            }
        }
    })
    return unblock
}

export const getBlockedUsers = async () => {
    const self = await getSelf();

    const blockedUsers = await prisma.block.findMany({
        where: {
            blockerId: self?.id
        },
        include: {
            blocked: {
                select:{
                    id:true,
                    name: true,
                    username: true,
                    imageUrl: true,
                    email: true,
                    createdAt: true
                }
            }
        }
    });

    return blockedUsers;
}