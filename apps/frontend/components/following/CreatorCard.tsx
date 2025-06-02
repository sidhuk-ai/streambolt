import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CreatorCardProps {
  creator: {
    id: string
    username: string
    isLive: boolean
    avatar: string
    category: string | undefined
  }
}

export default function CreatorCard({ creator }: CreatorCardProps) {
  const { username, isLive, avatar, category, id } = creator

  return (
    <Link href={`/creator/${id}`} className="group flex-shrink-0">
      <div className="flex flex-col items-center w-28">
        <div className="relative mb-2">
          <div
            className={`relative h-20 w-20 rounded-full overflow-hidden border-2 ${isLive ? "border-red-500" : "border-transparent"}`}
          >
            {/* <Image
              src={avatar || "/placeholder.svg"}
              width={200}
              height={200}
              alt={username}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            /> */}
            <Avatar>
              <AvatarImage src={avatar || "/placeholder.svg"} width={200} height={200} alt={username} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              <AvatarFallback>{username.slice(0,2)}</AvatarFallback>
            </Avatar>
          </div>
          {isLive && (
            <Badge
              variant="secondary"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 gap-1 bg-red-500 text-white hover:bg-red-500/90 px-2"
            >
              LIVE
            </Badge>
          )}
        </div>
        <h3 className="text-sm font-medium text-center line-clamp-1">{username}</h3>
        <p className="text-xs text-muted-foreground text-center">{isLive ? category : "Offline"}</p>
      </div>
    </Link>
  )
}

