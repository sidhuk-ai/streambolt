import { getSelf } from "@/actions/user";
import { prisma } from "./db";

export const getFeedStreams = async () => {
    let userId;

    try {
        const self = await getSelf();
        userId = self?.id
    } catch {
        userId = null;
    }

    let streams = [];

    if(userId) {
        streams = await prisma.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId
                            }
                        }
                    }
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        imageUrl: true,
                        username: true,
                        name: true,
                    }
                }
            },
            orderBy: [
                {
                    isLive : "desc",
                },
                {
                    updatedAt: "desc"
                }
            ]
        })
    } 
    else {
        streams = await prisma.stream.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        imageUrl: true,
                        username: true,
                        name: true,
                    }
                }
            },
            orderBy: [
                {
                    isLive: 'desc'
                },
                {
                    updatedAt: 'desc'
                }
            ]
        })
    }
    return streams;
}