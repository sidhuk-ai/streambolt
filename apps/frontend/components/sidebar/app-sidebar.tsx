import * as React from "react";
import { NavMain } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuSkeleton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LiveCreators } from "./live-creators";
import { getAllCreators } from "@/actions/user";


export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const creators = await getAllCreators();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="cursor-pointer">
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        {!!creators ? (
          <LiveCreators creators={creators} />
        ) : (
          <div className="w-full flex flex-col gap-3.5 my-2 mx-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <SidebarMenuSkeleton key={i} showIcon />
            ))}
          </div>
        )}
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
          {/* <NavUser /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
