"use client"

import * as React from "react"
import {
  ChartLine,
  Clapperboard,
  KeyRound,
  LayoutDashboard,
  MessageSquare,
  Settings2,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartLine,
    },
    {
      title: "Streams",
      url: "#",
      icon: Clapperboard,
      isActive: true,
    },
    {
      title: "Chats",
      url: "#",
      icon: MessageSquare,
    },
    {
      title: "Keys",
      url: "#",
      icon: KeyRound,
    },
    {
      title: "Community",
      url: "#",
      icon: Users,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
