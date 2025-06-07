import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface RecommendedStreamsProps {
  className?: string
}

export default function RecommendedStreams({ className }: RecommendedStreamsProps) {
  // Mock data for recommended streams
  const recommendedStreams = [
    {
      id: "rec-1",
      title: "Pro Gaming Tips & Tricks",
      username: "ProGamer123",
      category: "Gaming",
      viewers: 12500,
      thumbnail: "/placeholder.svg?height=720&width=1280&text=Gaming+Stream",
      tags: ["FPS", "Competitive", "Tutorial"],
    },
    {
      id: "rec-2",
      title: "Live Music Session",
      username: "MusicMaestro",
      category: "Music",
      viewers: 8300,
      thumbnail: "/placeholder.svg?height=720&width=1280&text=Music+Stream",
      tags: ["Live", "Piano", "Requests"],
    },
    {
      id: "rec-3",
      title: "Digital Art Masterclass",
      username: "ArtistPro",
      category: "Art",
      viewers: 5200,
      thumbnail: "/placeholder.svg?height=720&width=1280&text=Art+Stream",
      tags: ["Digital", "Tutorial", "Illustration"],
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recommended Streams</CardTitle>
        <CardDescription>Popular streams you might be interested in</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendedStreams.map((stream) => (
            <Link key={stream.id} href="#" className="block">
              <div className="flex gap-4 group">
                <div className="relative aspect-video w-32 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    width={100}
                    height={100}
                    src={stream.thumbnail || "/placeholder.svg"}
                    alt={stream.title}
                    className="!h-full !w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-1 left-1 flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-0.5 text-xs backdrop-blur">
                    <Badge variant="secondary" className="gap-1 bg-red-500 text-white hover:bg-red-500/90 px-1 py-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </Badge>
                    <span className="text-xs">{(stream.viewers / 1000).toFixed(1)}K</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                    {stream.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{stream.username}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Badge variant="outline" className="rounded-sm px-1 py-0 text-[10px]">
                      {stream.category}
                    </Badge>
                    {stream.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-sm px-1 py-0 text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

