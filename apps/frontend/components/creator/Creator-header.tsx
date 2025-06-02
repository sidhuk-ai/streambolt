"use client";

import Image from "next/image";
import { CheckCircle2, Calendar, UserCheck, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { useTransition } from "react";
import { Button } from "../ui/button";

interface Creator {
  id: string;
  name: string | null;
  username: string | null;
  email: string;
  emailVerified: Date | null;
  password: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface CreatorHeaderProps {
  creator: Creator;
  isFollowing: boolean;
  creatorId: string;
}

export function CreatorHeader({
  creator,
  isFollowing,
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

  const handleFollow = () => {
    startTransistion(() => {
      onFollow(creatorId)
        .then((data) => {
          toast.success(`You started following ${data.following.name}`);
        })
        .catch((er) => {
          toast.error("Something went wrong.");
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
          toast.error("Something went wrong.");
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
                  <CheckCircle2 className="h-6 w-6 text-blue-500" />
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

            <div className="flex">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
