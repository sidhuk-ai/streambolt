"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ThemeToggler";
import SearchBar from "./ui/search-input";
import { signOut, useSession } from "next-auth/react";
import { ChartNoAxesCombined, Clapperboard, LogOut, Settings, UserPen, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
  const { data: session,status } = useSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center mx-3 space-x-4 sm:justify-between sm:space-x-0 md:gap-4">
        <Link
          href={"/"}
          className="nav-header flex justify-center items-center gap-2 md:mx-4"
        >
          <Zap className="hover:animate-pulse" />
          <span className="font-bold text-xl">Streambolt</span>
        </Link>
        <div className="flex items-center gap-6 md:gap-10">
          <nav className="hidden gap-6 md:flex">
            <Link href="/browse" className=" animated-link">
              Browse
            </Link>
            <Link href="/categories" className="animated-link">
              Categories
            </Link>
            <Link href="/following" className="animated-link">
              Following
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center space-x-4 justify-end">
          <div className="relative hidden w-full max-w-sm md:flex">
            <SearchBar url="/search" />
          </div>
          <div className="theme-toggle hidden md:flex">
            <ModeToggle />
          </div>
          <div className="flex items-center space-x-2">
            {status === "loading" ? 
            <>
              <Skeleton className="w-9 h-9 rounded-full text-muted-foreground"/>
            </>
            :
              session?.user ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="w-9 h-9">
                          <AvatarImage src={session.user.image ?? ""} alt={session.user.name ?? ""}/>
                          <AvatarFallback>{session.user.name?.slice(0,2)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-lg min-w-56 m-1">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <Link href={'/dashboard'}>
                          <DropdownMenuItem className="w-full">
                            <UserPen />
                            <span className="font-medium pb-0.5">Profile</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link href={'/dashboard/my-streams'}>
                          <DropdownMenuItem className="w-full">
                            <Clapperboard />
                            <span className="font-medium pb-0.5">Your Streams</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link href={'/dashboard/analytics'}>
                          <DropdownMenuItem className="w-full">
                            <ChartNoAxesCombined />
                            <span className="font-medium pb-0.5">Analytics</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link href={'/dashboard/settings'}>
                          <DropdownMenuItem className="w-full">
                            <Settings />
                            <span className="font-medium pb-0.5">Settings</span>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={()=>signOut({redirectTo: '/'})} >
                          <LogOut />
                          <span className="font-medium pb-0.5" >Log Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link href={"/login"}>
                    <Button
                      variant={"outline"}
                      size="sm"
                      className="cursor-pointer hidden md:flex"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href={"/register"}>
                    <Button size="sm" className="cursor-pointer hidden md:flex">
                      Sign up
                    </Button>
                  </Link>
                </>
              )
            }
          </div>
        </div>
      </div>
    </header>
  );
}
