"use client";

import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton";

interface ChatListProps {
    messages: ReceivedChatMessage[];
    isHidden: boolean
}

interface ChatMessageProps {
    data: ReceivedChatMessage
}

export default function ChatList({
    messages,
    isHidden
}:ChatListProps) {

    if(isHidden || !messages || messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    {isHidden ? "Chat is Disabled" : "Welcome to the chat!"}
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
            {messages.map((message) => {
                return <ChatMessage
                    key={message.timestamp}
                    data={message}
                />
            })}

        </div>
    );
}

const ChatMessage = ({data}:ChatMessageProps) => {
    const color = stringToColor(data.from?.name || "");
    return (
        <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
            <p className="text-sm text-muted-foreground">
                { format(data.timestamp, "HH:MM") }
            </p>
            <div className="flex flex-wrap items-baseline gap-1 grow">
                <p className="text-sm font-semibold whitespace-nowrap">
                    <span className="truncate" style={{color: color}}>{data.from?.name}</span>:
                </p>
                <p className="text-sm  break-all">
                    {data.message}
                </p>
            </div>
        </div>
    )
}

export const ChatListSkeleton = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <Skeleton className="w-1.5 h-6" />
        </div>
    )
}