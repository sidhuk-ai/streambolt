"use client";

import { Skeleton } from "@/components/ui/skeleton";
import VariantToggle from "./variant-toggle";

export default function ChatHeader() {
    return (
        <div className="relative p-3 border-b">
            <p className="font-semibold text-center text-primary">
                Stream Chats
            </p>
            <div className="absolute top-2 right-2">
                <VariantToggle />
            </div>
        </div>
    )
}

export const ChatHeaderSkeleton = () => {
    return (
        <div className="relative p-3 border-b hidden md:block">
            <Skeleton className="w-28 h-6 mx-auto" />
        </div>
    )
}