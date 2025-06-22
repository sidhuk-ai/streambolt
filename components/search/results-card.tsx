'use client'

import Link from "next/link";
import { Thumbnail } from "../browse/StreamCard";
import { Verified } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ResultsCardProps {
  streamId: string;
  thumbailUrl: string | null;
  title: string;
  isLive: boolean;
  viewers?: number;
  avatar: string;
  username: string | null;
  name: string;
  updatedAt: Date;
}

export default function ResultsCard({
  streamId,
  thumbailUrl,
  title,
  isLive,
  viewers = 10,
  avatar,
  username,
  name,
  updatedAt
}: ResultsCardProps) {
  return (
    <Link href={`/stream/${streamId}`} className="group">
      <div className="w-full flex gap-x-4">
        <div className="relative h-36 w-64">
          <Thumbnail 
            thumbnail={thumbailUrl}
            title={title}
            isLive={isLive}
            viewers={viewers}
            avatar={avatar}
          />
        </div>
        <div className="space-y-1">
          <p className="font-bold">{name}</p>
          <div className="flex items-center gap-1">
            <p className="text-sm text-muted-foreground pb-0.5 gap-x-1">@{username}</p>
            <Verified className="stroke-streambolt-400 size-3.5" />
          </div>
          <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(updatedAt),{
            addSuffix: true
          })}</p>
        </div>
      </div>
    </Link>
  );
}
