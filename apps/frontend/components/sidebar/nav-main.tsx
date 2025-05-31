"use client"

import { LayoutGrid, Settings2, TvMinimalPlay, UserCheck, type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavMain() {
  const items = [
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
  ]
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Link href={item.url} key={item.title}>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
