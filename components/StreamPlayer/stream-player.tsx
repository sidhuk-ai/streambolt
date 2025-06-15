"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Prisma } from "@/lib/generated/prisma";
import { LiveKitRoom } from "@livekit/components-react";
import Video, { VideoSkeleton } from "./video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import Chat, { ChatSkeleton } from "./chat";
import CreatorActions, { CreatorActionSkeleton } from "./creator-actions";
import InfoCard from "./info-card";

type UserType = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    imageUrl: true;
    username: true;
    createdAt: true;
    stream: {
      select: {
        name: true;
        isLive: true;
        isChatDelayed: true;
        isChatEnabled: true;
        isChatFollowersOnly: true;
        thumbnailUrl: true;
      };
    };
  };
}>;

interface StreamPlayerProps {
  user: UserType;
  isFollowing: boolean;
}

export default function StreamPlayer({
  user,
  isFollowing,
}: StreamPlayerProps) {
  const { token, name, identity } = useViewerToken(user.id as string);
  const { collapsed } = useChatSidebar((state) => state);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-7 h-full transition",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto scrollbar-hide pb-10">
          <Video
            hostName={user.name as string}
            hostIdentity={user.id as string}
          />
          <CreatorActions
            hostName={user.name as string}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl as string}
            isFollowing={isFollowing}
            name={user.stream?.name as string}
            hostUsername={user.username}
          />
          <InfoCard 
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={user.stream?.name as string}
            thumbnailUrl={user.stream?.thumbnailUrl}
          />
        </div>
        <div className={cn("2xl:col-span-2 lg:col-span-1 xl:col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.name}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={user.stream?.isChatEnabled}
            isChatDelayed={user.stream?.isChatDelayed}
            isChatFollowersOnly={user.stream?.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
}

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-7 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 pb-10">
        <VideoSkeleton />
        <CreatorActionSkeleton />
      </div>
      <div className="col-span-2 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  )
}