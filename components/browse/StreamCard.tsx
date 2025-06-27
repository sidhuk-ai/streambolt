import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface StreamCardProps {
  stream: {
    id: string;
    title: string;
    username: string | null;
    category: string | undefined;
    viewers: number;
    thumbnail: string | null;
    avatar: string | null;
    tags: string[] | undefined;
    isLive: boolean;
  };
}
interface ThumbnailProps {
  viewers: number;
  title: string;
  thumbnail: string | null;
  isLive: boolean;
  avatar: string;
}

export default function StreamCard({ stream }: StreamCardProps) {
  const {
    title,
    username,
    category,
    viewers,
    thumbnail,
    avatar,
    tags,
    id,
    isLive,
  } = stream;

  return (
    <Link href={`/stream/${id}`} className="group">
      <Card className="overflow-hidden transition-all hover:shadow-lg gap-0 bg-background border-0 py-0">
        <Thumbnail
          thumbnail={thumbnail}
          title={title}
          viewers={viewers}
          isLive={isLive}
          avatar={avatar as string}
        />
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="size-12 rounded-full bg-muted">
              <UserIsLiveAvatar avatar={avatar as string} isLive={isLive} />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-medium leading-none line-clamp-1">{title}</h3>
              <p className="text-xs text-muted-foreground hover:text-accent-foreground w-fit">
                {username}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Badge
                  variant="outline"
                  className="rounded-sm px-1 py-0 text-[10px]"
                >
                  {category}
                </Badge>
                {tags?.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-sm px-1 py-0 text-[10px]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export const UserIsLiveAvatar = ({
  isLive = false,
  avatar,
}: {
  isLive?: boolean;
  avatar: string;
}) => {
  return (
    <Avatar
      className={cn(
        "size-12",
        isLive && "ring-2 ring-rose-500 border border-background"
      )}
    >
      <AvatarImage src={avatar} alt="User" className="object-cover" />
      <AvatarFallback>SB</AvatarFallback>
    </Avatar>
  );
};

export const Thumbnail = ({
  thumbnail,
  title,
  isLive,
  viewers,
  avatar,
}: ThumbnailProps) => {
  return (
    <div className="relative aspect-video overflow-hidden bg-muted rounded-xl">
      {!!thumbnail ? (
        <Image
          src={thumbnail}
          width={1280}
          height={720}
          alt={title}
          className="object-cover aspect-video transition-transform group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="flex size-full items-center justify-center">
          <div className="relative">
            <UserIsLiveAvatar avatar={avatar} isLive={isLive} />
            <Badge
              variant={isLive ? "default" : "outline"}
              className={cn(
                "absolute mt-1.5 -bottom-1 left-1/2 px-1 py-0 -translate-x-1/2 rounded-full bg-background text-foreground text-xs",
                isLive && "bg-rose-500 text-white"
              )}
            >
              {isLive ? "Live" : "Offline"}
            </Badge>
          </div>
        </div>
      )}
      {isLive && (
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-background/80 px-2 py-1 backdrop-blur">
          <Badge
            variant="secondary"
            className="gap-1 bg-red-500 text-white hover:bg-red-500/90"
          >
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            LIVE
          </Badge>
          <span className="text-xs font-medium">{viewers}</span>
        </div>
      )}
    </div>
  );
};
