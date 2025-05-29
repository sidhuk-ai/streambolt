import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface StreamCardProps {
  stream: {
    id: string
    title: string
    username: string
    category: string | undefined
    viewers: number
    thumbnail: string
    avatar: string
    tags: string[] | undefined
  }
}

export default function StreamCard({ stream }: StreamCardProps) {
  const { title, username, category, viewers, thumbnail, avatar, tags } = stream

  // Format viewer count
  const formatViewers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <Link href="#" className="group">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={thumbnail || "/placeholder.svg"}
            width={1280}
            height={720}
            alt={title}
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-background/80 px-2 py-1 backdrop-blur">
            <Badge variant="secondary" className="gap-1 bg-red-500 text-white hover:bg-red-500/90">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              LIVE
            </Badge>
            <span className="text-xs font-medium">{formatViewers(viewers)}</span>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
              <Image
                src={avatar || "/placeholder.svg"}
                width={80}
                height={80}
                alt={`${username}'s avatar`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium leading-none line-clamp-1">{title}</h3>
              <p className="text-xs text-muted-foreground">{username}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Badge variant="outline" className="rounded-sm px-1 py-0 text-[10px]">
                  {category}
                </Badge>
                {tags?.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-sm px-1 py-0 text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

