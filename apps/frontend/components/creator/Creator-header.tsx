"use client";

import Image from "next/image";
import { Calendar, UserCheck, UserPlus, MoreVertical, Ban, Verified } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@repo/db";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { onBlock, onUnblock } from "@/actions/block";

interface CreatorHeaderProps {
  creator: User;
  isFollowing: boolean;
  isBlocked: boolean;
  creatorId: string;
}

export function CreatorHeader({
  creator,
  isFollowing,
  isBlocked,
  creatorId,
}: CreatorHeaderProps) {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const [isPending, startTransistion] = useTransition();
  const handleClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleBlockClick = () => {
    if(isBlocked){
      handleUnblock();
    }else{
      handleBlock();
    }
  };

  const handleBlock = () => {
    startTransistion(() => {
      onBlock(creatorId)
        .then((data) => {
          toast.info(`You blocked ${data.blocked.name}.`)
        })
        .catch((err) => {
          console.log(err)
          toast.error(`${err}`)
        })
    })
  }

  const handleUnblock = () => {
    startTransistion(() => {
      onUnblock(creatorId)
        .then((data) => {
          toast.success(`You unblocked ${data.blocked.name}.`)
        })
        .catch((err) => {
          toast.error(`${err}.`)
        })
    })
  }

  const handleFollow = () => {
    startTransistion(() => {
      onFollow(creatorId)
        .then((data) => {
          toast.success(`You started following ${data.following.name}`);
        })
        .catch((er) => {
          toast.error(`${er}`);
        });
    });
  };

  const handleUnfollow = () => {
    startTransistion(() => {
      onUnfollow(creatorId)
        .then((data) => {
          toast.success(`You un-followed ${data.following.name}`);
        })
        .catch((er) => {
          toast.error(`${er}`);
        });
    });
  };

  return (
    <div className="relative">
      <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
        <Image
          src={"/placeholder.svg"}
          alt={`${creator.name} banner`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <Badge className="gap-1 bg-red-500 text-white hover:bg-red-500/90 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            LIVE
          </Badge>
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="relative -mt-16 md:-mt-20">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            <div className="relative">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-background bg-background">
                <Avatar className="h-full w-full object-cover">
                  <AvatarImage
                    src={creator.imageUrl || "/placeholder.svg"}
                    alt={creator.name || ""}
                    className="h-full w-full"
                  />
                  <AvatarFallback>{creator.name}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="flex-1 space-y-4 pb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {creator.name}
                  </h1>
                  <Verified className="h-6 w-6 text-blue-00" />
                </div>
                <p className="text-lg text-muted-foreground">
                  @streamer-{creator.id.slice(-4)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-muted-foreground">
                    Joined {formatDate(creator.createdAt.toLocaleDateString())}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 not-md:justify-between">
              <Button
                onClick={handleClick}
                disabled={isPending}
                variant={isFollowing ? "outline" : "default"}
                className={`gap-2 min-w-[120px] transition-all duration-200 group ${
                  isFollowing
                    ? "hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {isFollowing ? (
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
              <DropdownMenu>
                {/* TODO: Add Unblock button also */}
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className="rounded-full">
                    <MoreVertical className="h-9 w-9" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-1 mr-10 mt-1">
                  <DropdownMenuItem variant="destructive" disabled={isPending} className="flex items-center" onClick={handleBlockClick}>
                    <Ban />
                    <span className="font-semibold text-base pb-0.5">Block</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
