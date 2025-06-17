"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormEvent, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info, SendHorizonal } from "lucide-react";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowersOnly: boolean | undefined;
  isDelayed: boolean | undefined;
  isFollowing: boolean;
}
interface ChatInfoProps {
  isDelayed: boolean | undefined;
  isFollowersOnly: boolean | undefined;
}

export default function ChatForm({
  onSubmit,
  onChange,
  value,
  isDelayed,
  isFollowersOnly,
  isFollowing,
  isHidden,
}: ChatFormProps) {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isFollowersOnlyAndNotFollowing || isDelayBlocked;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <div className="relative">
          <Input
            onChange={(e) => onChange(e.target.value)}
            value={value}
            disabled={isDisabled}
            placeholder="Send a message"
            className={cn(
              "",
              (isFollowersOnly || isDelayed) && "rounded-t-none border-t-0"
            )}
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50"
          >
            <SendHorizonal size={16} className="text-green-400" />
          </button>
        </div>
      </div>
    </form>
  );
}

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};

const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
  const info = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Chat is for Followers only.";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Chats are delayed by 3s.";
    }

    if (isDelayed && isFollowersOnly) {
      return "Chat is for Followers only, and messages are delayed by 3s.";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Followers only";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Slow mode";
    }

    if (isDelayed && isFollowersOnly) {
      return "Followers only and Slow mode";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) {
    return null;
  }

  return (
    <div className="p-2 text-muted-foreground bg-brand/15 border-brand/20 dark:bg-white/5 dark:border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
      <p className="text-xs font-semibold">{info}</p>
    </div>
  );
};
