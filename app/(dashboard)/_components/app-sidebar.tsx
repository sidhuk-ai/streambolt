"use client";

import * as React from "react";
import {
  ChartLine,
  Clapperboard,
  KeyRound,
  LayoutDashboard,
  MessageSquare,
  Settings2,
  Users,
  Zap,
} from "lucide-react";

import { NavMain } from "./nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

// This is sample data.
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
      <SidebarHeader className="flex flex-row items-center gap-4 mt-1">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <Zap className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-base">
          <span className="truncate font-brand text-xl">Streambolt</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
