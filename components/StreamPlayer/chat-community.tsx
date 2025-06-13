"use client";

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState, useTransition } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, stringToColor } from "@/lib/utils";
import { onBlock } from "@/actions/block";
import { toast } from "sonner";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { MinusCircle } from "lucide-react";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
  viewerName: string;
  hostName: string | null;
  isHidden: boolean;
}
interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export default function ChatCommunity({
  viewerName,
  hostName,
  isHidden,
}: ChatCommunityProps) {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounceValue<string>(value, 500);
  const participants = useParticipants();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc,participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if(!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant)
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((participant) => {
      return participant?.name?.toLowerCase().includes(debouncedValue.toLowerCase())
    })
  }, [participants, debouncedValue])

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community"
        className="dark:border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName as string}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
}

const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || "");

  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if(!participantName || isSelf || !isHost) return null;

    startTransition(() => {
      onBlock(participantIdentity).then(() => {
        toast.success(`Blocked ${participantName}`)
      }).catch(() => {
        toast.error('Something went wrong.');
      })
    });
  }
  return (
    <div className={cn("group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-accent", isPending && "opacity-50 pointer-events-none")}>
      <p className="" style={{color: color}}>
        {participantName}
      </p>
      {isHost && !isSelf && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              disabled={isPending}
              onClick={handleBlock}
              className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <MinusCircle className="h-4 w-4 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
        </Tooltip>
      )}
    </div>
  );
};
