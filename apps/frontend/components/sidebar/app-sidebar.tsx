"use client";

import * as React from "react";
import {
  LayoutGrid,
  Settings2,
  TvMinimalPlay,
  UserCheck,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { LiveCreators } from "./live-creators";

// Sidebar Menu ke items yaha par aayenge.
const data = {
  navMain: [
    {
      title: "Categories",
      url: "/categories",
      icon: LayoutGrid,
      isActive: true
    },
    {
      title: "Feed",
      url: "/browse",
      icon: TvMinimalPlay
    },
    {
      title: "Following",
      url: "/following",
      icon: UserCheck
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2
    },
  ],
  liveCreators: [
    {
      id: "1",
      name: "ProGamer123",
      avatar: "/placeholder.svg?height=40&width=40&text=PG",
      isLive: true,
      category: "Gaming",
      viewers: 1250,
    },
    {
      id: "2",
      name: "MusicMaestro",
      avatar: "/placeholder.svg?height=40&width=40&text=MM",
      isLive: true,
      category: "Music",
      viewers: 850,
    },
    {
      id: "3",
      name: "ArtistPro",
      avatar: "/placeholder.svg?height=40&width=40&text=AP",
      isLive: true,
      category: "Art",
      viewers: 620,
    },
    {
      id: "4",
      name: "SportsFan",
      avatar: "/placeholder.svg?height=40&width=40&text=SF",
      isLive: true,
      category: "Sports",
      viewers: 430,
    },
    {
      id: "5",
      name: "ChillStreamer",
      avatar: "/placeholder.svg?height=40&width=40&text=CS",
      isLive: true,
      category: "Just Chatting",
      viewers: 320,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="cursor-pointer">
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <LiveCreators creators={data.liveCreators} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
          {/* <NavUser /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
