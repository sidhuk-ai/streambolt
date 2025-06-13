"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts"
import ChatHeader, { ChatHeaderSkeleton } from "./chat-header";
import ChatForm, { ChatFormSkeleton } from "./chat-form";
import ChatList, { ChatListSkeleton } from "./chat-list";
import ChatCommunity from "./chat-community";

interface ChatPageProps {
    viewerName: string;
    hostName: string | null;
    hostIdentity: string;
    isFollowing: boolean;
    isChatEnabled: boolean | undefined;
    isChatDelayed: boolean | undefined
    isChatFollowersOnly: boolean | undefined
}

export default function Chat({
    viewerName,
    hostName,
    hostIdentity,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly
}: ChatPageProps) {
    const matches = useMediaQuery('(max-width: 1024px)');
    const { variant, onExpand } = useChatSidebar((state) => state);
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline = participant && connectionState === ConnectionState.Connected
    const isHidden = !isChatEnabled || !isOnline

    const [value, setValue] = useState("");
    const { chatMessages: messages, send } = useChat()

    useEffect(() => {
        if(matches) {
            onExpand()
        }
    },[matches,onExpand])

    const reverseMessages = useMemo(() => {
        return messages.sort((a,b) => b.timestamp - a.timestamp);
    },[messages])

    const onSubmit = () => {
        if(!send) return;

        send(value);
        setValue("");
    }

    const onChange = (value: string) => {
        setValue(value);
    }

    return (
        <div className="flex flex-col bg-background border rounded-md pt-0 h-full">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList messages={reverseMessages} isHidden={isHidden} />
                    <ChatForm
                        onSubmit={onSubmit}
                        value={value}
                        onChange={onChange}
                        isHidden={isHidden}
                        isFollowersOnly={isChatFollowersOnly}
                        isDelayed={isChatDelayed}
                        isFollowing={isFollowing}
                    />
                </>
            )}
            {variant === ChatVariant.COMMUNITY && (
                <>
                    <ChatCommunity viewerName={viewerName} hostName={hostName} isHidden={isHidden} />
                </>
            )}
        </div>
    );
}

export const ChatSkeleton = () => {
    return (
        <div className="flex flex-col border rounded-md pt-0 h-full">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    )
}