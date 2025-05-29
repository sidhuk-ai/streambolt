"use client"

import { Badge } from "@/components/ui/badge"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Creator {
  id: string
  name: string
  avatar: string
  isLive: boolean
  category: string
  viewers: number
}

interface LiveCreatorsProps {
  creators: Creator[]
}

export function LiveCreators({ creators }: LiveCreatorsProps) {
  const formatViewers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Live Now</SidebarGroupLabel>
      <SidebarMenu>
        {creators.map((creator) => (
          <SidebarMenuItem key={creator.id} className="w-full my-1.5">
            <SidebarMenuButton asChild>
              <a href={`/watch/${creator.id}`} className="flex items-center gap-3.5 group-data-[collapsible=icon]:pl-0! h-fit">
                <div className="relative">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                    <AvatarFallback>{creator.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {creator.isLive && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-red-500 border-2 border-background"/>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{creator.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="truncate">{creator.category}</span>
                    <span>•</span>
                    <span>{formatViewers(creator.viewers)}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-red-500 text-white hover:bg-red-500/90 text-xs px-1 py-0">
                  LIVE
                </Badge>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
