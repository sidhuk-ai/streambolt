"use server";

import { v4 } from "uuid";
import { getSelf, getUserById } from "./user";
import { AccessToken } from "livekit-server-sdk";
import { isBlockedByUser } from "@/lib/block-service";

export const createViewerToken = async (hostIdentity: string) => {
    let self;

    try{
        self = await getSelf();
    } catch {
        const id = v4();
        const username = `guest#${Math.floor(Math.random() * 1000)}`
        self = { id, username };
    }

    const host = await getUserById(hostIdentity);
    if(!host) throw new Error("Host not found.");

    const isBlocked = await isBlockedByUser(host.id);
    if(isBlocked) throw new Error("You are currently blocked from viewing.");

    const isHost = self?.id === host.id

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET,
        {
            identity: isHost ? `host-${self?.id}` : self?.id,
            name: self?.username as string
        }
    );
    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true
    });

    return await token.toJwt();
}