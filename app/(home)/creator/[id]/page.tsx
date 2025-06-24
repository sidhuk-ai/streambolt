import { isFollowingCreator } from "@/lib/follow-service";
import { CreatorHeader } from "@/components/creator/Creator-header";
import { getUserById } from "@/actions/user";
import Footer from "@/components/Footer";
import { isBlockedByUser } from "@/lib/block-service";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Share2, WifiOff } from "lucide-react";

export default async function Creator({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isFollowing = await isFollowingCreator(id);
  const isBlocked = await isBlockedByUser(id);
  const creator = await getUserById(id);

  return (
    <div className="flex flex-col overflow-hidden min-h-screen">
      <main className="flex-1">
        <div className="pb-6 mb-3">
          <CreatorHeader
            creator={creator}
            isFollowing={isFollowing}
            isBlocked={isBlocked}
          />
        </div>
        <div className="m-4 w-full h-full px-6">
          {creator.stream?.isLive ? <div className="max-w-xl">
            <StreamCard />
          </div> :
          <div className="flex flex-col items-center justify-center gap-4">
            <WifiOff className="text-muted-foreground md:size-20" />
            <p className="text-xl text-muted-foreground">{creator.name} is Offline.</p>
          </div>
          }
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StreamCard() {
  // TODO: Add real data
  //Mock data for LiveStreamCard
  const stream = {
    id: "live-1",
    title: "Friday Night Gaming Marathon",
    category: "Gaming",
    startedAt: "2 hours ago",
    viewers: 1250,
    thumbnail: "/placeholder.svg?height=720&width=1280&text=Gaming+Stream",
  };
  return (
    <Card className="py-0">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={stream.thumbnail || "/placeholder.svg"}
          alt={stream.title}
          width={100}
          height={100}
          className="!h-full !w-full rounded-t-lg object-cover"
        />
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-background/80 px-2 py-1 backdrop-blur">
          <Badge
            variant="secondary"
            className="gap-1 bg-red-500 text-white hover:bg-red-500/90"
          >
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            LIVE
          </Badge>
          <span className="text-xs font-medium">
            {stream.viewers.toLocaleString()}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium line-clamp-1">{stream.title}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Stream Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Stream
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center justify-between text-sm">
            <Badge variant="outline" className="rounded-sm px-1 py-0 text-xs">
              {stream.category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Started {stream.startedAt}
            </span>
          </div>
          <div className="flex justify-between pt-2">
            <Button size="sm" variant="outline">
              View Stream
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}