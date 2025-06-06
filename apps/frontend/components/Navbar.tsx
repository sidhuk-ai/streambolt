"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ThemeToggler";
import SearchBar from "@/components/ui/search-input";
import { signOut, useSession } from "next-auth/react";
import {
  ChartNoAxesCombined,
  Clapperboard,
  Globe,
  House,
  LayoutGrid,
  LogInIcon,
  LogOut,
  Settings,
  User,
  UserPen,
  UserRoundPlus,
  Users,
  Zap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Session } from "next-auth";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center mx-3 space-x-4 sm:justify-between sm:space-x-0 md:gap-4">
        <Link
          href={"/"}
          className="nav-header flex justify-center items-center gap-2 md:mx-4"
        >
          <Zap className="hover:animate-pulse" />
          <span className="font-bold font-brand text-xl hidden md:block">Stream</span>
        </Link>
        <div className="flex items-center gap-6 md:gap-10">
          <nav className="hidden gap-6 md:flex">
            <Link href="/browse" className={cn("font-semibold text-muted-foreground",pathname==='/browse' ? 'text-[#1fd5f9]' : "hover:text-white")}>
              Browse
            </Link>
            <Link href="/categories" className={cn("font-semibold text-muted-foreground",pathname==='/categories' ? 'text-[#1fd5f9]' : "hover:text-white")}>
              Categories
            </Link>
            <Link href="/following" className={cn("font-semibold text-muted-foreground",pathname==='/following' ? 'text-[#1fd5f9]' : "hover:text-white")}>
              Following
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center space-x-4 justify-end">
          <div className="relative hidden w-full max-w-sm md:flex">
            <SearchBar url="/search" />
          </div>
          <div className="theme-toggle md:flex">
            <ModeToggle />
          </div>
          <div className="flex items-center space-x-2">
            {status === "loading" ? (
              <>
                <Skeleton className="w-9 h-9 rounded-full text-muted-foreground" />
              </>
            ) : session?.user ? (
              <>
                <Dropdown session={session} />
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
                <span className="md:hidden">
                  <DrawerMenu />
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
    <BottomNav />
    </>
  );
}

function DrawerMenu() {
  return (
    <Drawer>
      <DrawerTrigger asChild className="cursor-pointer">
        <User className="h-9 w-9 border rounded-full p-1.5"/>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Account</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-y-2 mb-4 flex-col">
              <Link href={'/login'} className="w-full">
                <Button variant={"outline"} className="w-full">
                  <LogInIcon />
                  Login
                </Button>
              </Link>
              <Link href={'/register'} className="w-full">
                <Button className="w-full">
                  <UserRoundPlus />
                  Sign Up
                </Button>
              </Link>
              
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function Dropdown({ session }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-9 h-9">
          <AvatarImage
            src={session?.user?.image ?? ""}
            alt={session?.user?.name ?? ""}
          />
          <AvatarFallback>{session?.user?.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg min-w-56 m-1">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/dashboard"}>
            <DropdownMenuItem className="w-full">
              <UserPen />
              <span className="font-medium pb-0.5">Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href={"/dashboard/my-streams"}>
            <DropdownMenuItem className="w-full">
              <Clapperboard />
              <span className="font-medium pb-0.5">Your Streams</span>
            </DropdownMenuItem>
          </Link>
          <Link href={"/dashboard/analytics"}>
            <DropdownMenuItem className="w-full">
              <ChartNoAxesCombined />
              <span className="font-medium pb-0.5">Analytics</span>
            </DropdownMenuItem>
          </Link>
          <Link href={"/dashboard/settings"}>
            <DropdownMenuItem className="w-full">
              <Settings />
              <span className="font-medium pb-0.5">Settings</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => signOut({ redirectTo: "/" })}>
            <LogOut />
            <span className="font-medium pb-0.5">Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function BottomNav(){
  return(
    <div className="flex z-50 fixed bottom-0 md:hidden w-full justify-between items-center p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <Link href={"/"} className="flex flex-col items-center">
        <House/>
        <span className="text-xs">Home</span>
      </Link>
      <Link href={"/browse"} className="flex flex-col items-center">
        <Globe />
        <span className="text-xs">Browse</span>
      </Link>
      <Link href={"/categories"} className="flex flex-col items-center">
        <LayoutGrid />
        <span className="text-xs">Categories</span>
      </Link>
      <Link href={"/following"} className="flex flex-col items-center">
        <Users />
        <span className="text-xs">Following</span>
      </Link>
    </div>
  )
}