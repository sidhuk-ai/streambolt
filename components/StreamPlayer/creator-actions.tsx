"use client";

import { UserCheck, UserPlus, Users2, VerifiedIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useParticipants } from "@livekit/components-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useTransition } from "react";
import { onUnfollow } from "@/actions/follow";
import { toast } from "sonner";

interface CreatorActionsProps {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    imageUrl: string;
    isFollowing: boolean;
    name: string;
    hostUsername: string | null;
}

export default function CreatorActions({
    hostName,
    hostIdentity,
    viewerIdentity,
    imageUrl,
    isFollowing,
    name,
    hostUsername
}: CreatorActionsProps) {
    const participants = useParticipants();
    const noOfParticipants = participants.length - 1;
    const [following, setFollowing] = useState(isFollowing);
    const [isPending, startTransition] = useTransition();
    // console.log({hostIdentity, viewerIdentity});
    const viewerIsHost = hostIdentity === viewerIdentity;

    const handleClick = () => {
        if(viewerIsHost) {
            return null;
        }

        if(isFollowing && !viewerIsHost) {
            setFollowing(false);
            startTransition(() => {
                onUnfollow(hostIdentity).then(() => {
                    toast.success("Removed from followed list.");
                }).catch(() => {
                    setFollowing(true);
                    toast.error("Something went wrong.")
                })
            })
        }

        if(!isFollowing && !viewerIsHost) {
            setFollowing(true);
            startTransition(() => {
                onUnfollow(hostIdentity).then(() => {
                    toast.success("Started folowing.");
                }).catch(() => {
                    setFollowing(false);
                    toast.error("Something went wrong.")
                })
            })
        }
    }

    return (
        <div className="w-full ml-1 flex flex-col items-start justify-center gap-y-2">
            <div className="mx-2 mb-4 flex gap-y-1 flex-col">
                <h1 className="text-2xl font-semibold tracking-tight">{name}</h1>
                <p className="text-muted-foreground text-sm">
                    {noOfParticipants === 0 ? "Offline" : (
                        <span className="text-red-500 flex items-center justify-items-start gap-x-1.5">
                            <Users2 className="size-3.5" />
                            {noOfParticipants} {noOfParticipants === 1 ? "viewer" : "viewers"}
                        </span>
                    )}
                </p>
            </div>
            <div className="flex items-start justify-between w-full">
                <div className="flex gap-3">
                    <Avatar className="size-14">
                        <AvatarImage src={imageUrl} alt={hostName} />
                        <AvatarFallback>{hostName.slice(2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start justify-center">
                        <h1 className="font-semibold text-lg flex items-center justify-center gap-1">
                            {hostName}
                            <span>
                                <VerifiedIcon className="size-3.5" />
                            </span>
                        </h1>
                        <span className="text-muted-foreground text-sm">@{hostUsername}</span>
                    </div>
                </div>
                <div className="block mr-3 md:mr-5">
                    <Button
                        disabled={isPending}
                        onClick={handleClick}
                        variant={following ? "outline" : "default"}
                        className={`gap-2 min-w-[120px] transition-all duration-200 group ${
                        isFollowing
                            ? "hover:!bg-destructive hover:text-destructive-foreground hover:!border-destructive"
                            : "!bg-purple-600 hover:!bg-purple-700"
                        }`}
                    >
                        {following ? (
                            <>
                                <UserCheck className="h-4 w-4" />
                                <span className="group-hover:hidden">Following</span>
                            </>
                            ) : (
                            <>
                                <UserPlus className="h-4 w-4" />
                                Follow
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export const CreatorActionSkeleton = () => {
return (
    <div className="w-full ml-1 flex flex-col items-start justify-center gap-y-2">
        <div className="mx-2 mb-4 flex gap-y-1 flex-col w-full">
            <Skeleton className="w-2/5 h-8 rounded-md" />
            <Skeleton className="w-20 h-5 rounded-md" />
        </div>
        <div className="flex items-start justify-between w-full">
            <div className="flex gap-3">
                <Skeleton className="size-14 rounded-full" />
                <div className="flex flex-col items-start justify-center gap-1">
                    <Skeleton className="h-6 w-20 rounded-md" />
                    <Skeleton className="h-5 w-10 rounded-md" />
                </div>
            </div>
            <div className="block mr-3 md:mr-5">
                <Skeleton className="w-[120px] h-9 rounded-md" />
            </div>
        </div>
    </div>
)
}