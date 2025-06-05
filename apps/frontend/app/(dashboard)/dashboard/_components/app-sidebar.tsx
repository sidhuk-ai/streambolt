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

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: ChartLine,
    },
    {
      title: "Streams",
      url: "/dashboard/my-streams",
      icon: Clapperboard,
    },
    {
      title: "Chats",
      url: "/dashboard/chats",
      icon: MessageSquare,
    },
    {
      title: "Keys",
      url: "/dashboard/keys",
      icon: KeyRound,
    },
    {
      title: "Community",
      url: "/dashboard/community",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
};
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
  );
}
