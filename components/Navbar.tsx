"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ThemeToggler";
import SearchBar from "@/components/ui/search-input";
import { signOut, useSession } from "next-auth/react";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Clapperboard,
  Globe,
  House,
  LayoutDashboard,
  LayoutGrid,
  LogInIcon,
  LogOut,
  LucideIcon,
  Settings,
  User,
  UserPen,
  UserRoundPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
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

type DropdownType = {
  id: number;
  url: string;
  title: string;
  icon: LucideIcon;
};
interface DropdownProps {
  props: DropdownType[];
  avatar: string | null | undefined;
}

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const authenticatedDrawerItems = [
    [
      {
        id: 1,
        url: "/dashboard",
        title: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        id: 2,
        url: "/dashboard/my-streams",
        title: "Your Streams",
        icon: Clapperboard,
      },
      {
        id: 3,
        url: "/dashboard/analytics",
        title: "Analytics",
        icon: ChartNoAxesCombined,
      },
      {
        id: 4,
        url: "/dashboard/settings",
        title: "Settings",
        icon: Settings,
      },
    ],
    [
      {
        id: 1,
        url: "/login",
        title: "Login",
        icon: LogInIcon,
      },
      {
        id: 2,
        url: "/sign-up",
        title: "Sign-up",
        icon: UserRoundPlus,
      },
    ],
  ];
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center mx-3 space-x-4 sm:justify-between sm:space-x-0 md:gap-4">
          <Link
            href={"/"}
            className="nav-header flex justify-center items-center gap-2 md:mx-4"
          >
            <span className="font-bold font-brand text-2xl hidden md:block">
              BOLT
            </span>
          </Link>
          <div className="flex items-center gap-6 md:gap-10">
            <nav className="hidden gap-6 md:flex">
              <Link
                href="/browse"
                className={cn(
                  "font-semibold text-muted-foreground",
                  pathname === "/browse"
                    ? "text-[#1fd5f9]"
                    : "hover:dark:text-white hover:text-black"
                )}
              >
                Browse
              </Link>
              <Link
                href="/categories"
                className={cn(
                  "font-semibold text-muted-foreground",
                  pathname === "/categories"
                    ? "text-[#1fd5f9]"
                    : "hover:dark:text-white hover:text-black"
                )}
              >
                Categories
              </Link>
              <Link
                href="/following"
                className={cn(
                  "font-semibold text-muted-foreground",
                  pathname === "/following"
                    ? "text-[#1fd5f9]"
                    : "hover:dark:text-white hover:text-black"
                )}
              >
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
                  <span className="hidden md:block">
                    <Dropdown session={session} />
                  </span>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    className="group transition-all not-md:hidden duration-300 rounded-full ease-in-out transform hover:scale-105 hover:bg-primary/90 hover:shadow-lg"
                  >
                    <Link href="/login">
                      Login
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </>
              )}
              <span className="md:hidden">
                <DrawerMenu
                  avatar={session?.user?.image}
                  props={
                    session
                      ? authenticatedDrawerItems[0]
                      : authenticatedDrawerItems[1]
                  }
                />
              </span>
            </div>
          </div>
        </div>
      </header>
      <BottomNav paths={pathname} />
    </>
  );
}

function DrawerMenu({ props, avatar }: DropdownProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild className="cursor-pointer">
        {!!avatar ? (
          <Avatar className="size-9">
            <AvatarImage src={avatar} />
            <AvatarFallback>USER</AvatarFallback>
          </Avatar>
        ) : (
          <User className="h-9 w-9 border rounded-full p-1.5" />
        )}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Account</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-y-2 mb-4 flex-col">
              {props.map((item) => (
                <Button
                  variant={item.title === "Sign-up" ? "default" : "outline"}
                  className="w-full"
                  key={item.id}
                >
                  <Link href={item.url} className="flex items-center gap-2.5">
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </Button>
              ))}
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
      <DropdownMenuTrigger className="cursor-pointer" asChild>
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
          <DropdownMenuSeparator className="my-2" />
          <DropdownMenuItem
            variant={"destructive"}
            onClick={() => signOut({ redirectTo: "/" })}
          >
            <LogOut />
            <span className="font-medium pb-0.5">Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function BottomNav({ paths }: { paths: string }) {
  return (
    <div className="flex z-50 fixed bottom-0 md:hidden w-full justify-between items-center p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <Link href={"/"} className="flex flex-col items-center transition">
        <House
          className={cn(
            paths === "/" && "fill-accent-foreground stroke-accent"
          )}
        />
        <span className="text-xs">Home</span>
      </Link>
      <Link href={"/browse"} className="flex flex-col items-center">
        <Globe
          className={cn(
            paths === "/browse" && "fill-accent-foreground stroke-accent"
          )}
        />
        <span className="text-xs">Browse</span>
      </Link>
      <Link href={"/categories"} className="flex flex-col items-center">
        <LayoutGrid
          className={cn(
            paths === "/categories" && "fill-accent-foreground stroke-0"
          )}
        />
        <span className="text-xs">Categories</span>
      </Link>
      <Link href={"/following"} className="flex flex-col items-center">
        <Users
          className={cn(
            paths === "/following" && "fill-accent-foreground stroke-0"
          )}
        />
        <span className="text-xs">Following</span>
      </Link>
    </div>
  );
}
