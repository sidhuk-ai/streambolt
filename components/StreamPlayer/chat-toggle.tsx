"use client";

import { MessagesSquare } from "lucide-react";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function ChatToggle() {
    const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state);
    const label = collapsed ? "Open Chat" : "Close Chat";

    const onToggle = () => {
        if(collapsed) {
            onExpand();
        } else {
            onCollapse()
        }
    }
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button onClick={onToggle} className="h-auto p-2 text-white hover:text-white/65 dark:hover:text-white/10" >
                    <MessagesSquare className={cn("h-5 w-5", !collapsed && "fill-current")} />
                </button>
            </TooltipTrigger>
            <TooltipContent>
                {label}
            </TooltipContent>
        </Tooltip>
    )
}