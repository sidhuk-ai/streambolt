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
import Link from "next/link";
import { User } from "@repo/db";

interface CreatorProps{
  creators: User[]
}

export function LiveCreators({creators}:CreatorProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Live Now</SidebarGroupLabel>
      <SidebarMenu>
        {creators.map((creator) => (
          <SidebarMenuItem key={creator.id} className="w-full my-1.5">
            <SidebarMenuButton asChild>
              <Link href={`/creator/${creator.id}`} className="flex items-center gap-3.5 group-data-[collapsible=icon]:pl-0! h-fit">
                <div className="relative">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={creator.imageUrl || "/placeholder.svg"} alt={creator.name || creator.id.slice(0,3)} />
                    <AvatarFallback>{creator?.name?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {/* {creator.isLive && ( */}
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-red-500 border-2 border-background"/>
                  {/* )} */}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{creator.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="truncate">{creator.email}</span>
                    {/* <span>•</span> */}
                    {/* <span>{formatViewers(creator.viewers)}</span> */}
                  </div>
                </div>
                <Badge variant="secondary" className="bg-red-500 text-white hover:bg-red-500/90 text-xs px-1 py-0">
                  LIVE
                </Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
