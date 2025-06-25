import { getSelf } from "@/actions/user";
import { prisma } from "./db";

export const searchService = async (term: string) => {
    let userId;

    try {
        const self = await getSelf();
        userId = self?.id;
    } catch {
        userId = null;
    }

    let streams = [];

    if(userId){
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
                OR: [
                    {
                        name: {
                            contains: term,
                            mode: 'insensitive'
                        }
                    },
                    {
                        user: {
                            OR: [
                                {
                                    username: {
                                        contains: term,
                                        mode: 'insensitive'
                                    }
                                },
                                {
                                    name: {
                                        contains: term,
                                        mode: 'insensitive'
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    updatedAt: "desc"
                }
            ],
            select: {
                id: true,
                name: true,
                thumbnailUrl: true,
                isLive: true,
                user:{
                    select:{
                        id: true,
                        name: true,
                        username: true,
                        imageUrl: true
                    }
                },
                updatedAt: true,
                createdAt: true
            }
        })
    }else {
        streams = await prisma.stream.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: term,
                            mode: 'insensitive'
                        }
                    },
                    {
                        user: {
                            OR: [
                                {
                                    username: {
                                        contains: term,
                                        mode: 'insensitive'
                                    }
                                },
                                {
                                    name: {
                                        contains: term,
                                        mode: 'insensitive'
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    updatedAt: "desc"
                }
            ],
            select: {
                id: true,
                name: true,
                thumbnailUrl: true,
                isLive: true,
                user:{
                    select:{
                        id: true,
                        name: true,
                        username: true,
                        imageUrl: true
                    }
                },
                createdAt: true,
                updatedAt: true
            }
        })
    }

    return streams
}