"use client"

import type React from "react"

import { useState } from "react"
import { Edit, MoreHorizontal, Play, Plus, Trash2, Video, VideoOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import Image from "next/image"

// Mock data for streams
const liveStreams = [
  {
    id: "live-1",
    title: "Friday Night Gaming Marathon",
    category: "Gaming",
    startedAt: "2 hours ago",
    viewers: 1250,
    thumbnail: "/placeholder.svg?height=720&width=1280&text=Gaming+Stream",
  },
]

const pastStreams = [
  {
    id: "past-1",
    title: "Art Creation Session",
    category: "Art",
    date: "Yesterday",
    duration: "3h 24m",
    views: 4500,
    thumbnail: "/placeholder.svg?height=720&width=1280&text=Art+Stream",
  },
  {
    id: "past-2",
    title: "Just Chatting with Viewers",
    category: "Just Chatting",
    date: "3 days ago",
    duration: "1h 45m",
    views: 2800,
    thumbnail: "/placeholder.svg?height=720&width=1280&text=Chat+Stream",
  },
  {
    id: "past-3",
    title: "Music Production Walkthrough",
    category: "Music",
    date: "Last week",
    duration: "2h 10m",
    views: 3600,
    thumbnail: "/placeholder.svg?height=720&width=1280&text=Music+Stream",
  },
]

const scheduledStreams = [
  {
    id: "scheduled-1",
    title: "Weekly Gaming Tournament",
    category: "Gaming",
    scheduledFor: "Tomorrow, 7:00 PM",
    status: "scheduled",
  },
  {
    id: "scheduled-2",
    title: "Q&A Session with Fans",
    category: "Just Chatting",
    scheduledFor: "Friday, 6:30 PM",
    status: "scheduled",
  },
  {
    id: "scheduled-3",
    title: "Collaborative Art Project",
    category: "Art",
    scheduledFor: "Not scheduled",
    status: "draft",
  },
]

export default function MyStreams() {
  const [activeTab, setActiveTab] = useState("live")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="My Streams" text="Manage your live, past, and scheduled streams">
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          New Stream
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="live" onValueChange={setActiveTab} value={activeTab}>
        <TabsList>
          <TabsTrigger value="live" className="relative">
            Live
            {liveStreams.length > 0 && (
              <Badge className="ml-2 bg-red-500 hover:bg-red-500/90 px-1 py-0 text-[10px]">{liveStreams.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="scheduled">
            Scheduled
            {scheduledStreams.filter((s) => s.status === "scheduled").length > 0 && (
              <Badge className="ml-2 px-1 py-0 text-[10px]">
                {scheduledStreams.filter((s) => s.status === "scheduled").length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          {liveStreams.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {liveStreams.map((stream) => (
                <LiveStreamCard key={stream.id} stream={stream} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<VideoOff className="h-8 w-8 text-muted-foreground" />}
              title="No Live Streams"
              description="You don't have any active streams right now."
              action={
                <Button>
                  <Play className="mr-2 h-4 w-4" />
                  Go Live Now
                </Button>
              }
            />
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastStreams.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastStreams.map((stream) => (
                <PastStreamCard key={stream.id} stream={stream} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Video className="h-8 w-8 text-muted-foreground" />}
              title="No Past Streams"
              description="Your previous streams will appear here."
            />
          )}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {scheduledStreams.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {scheduledStreams.map((stream) => (
                <ScheduledStreamCard key={stream.id} stream={stream} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Video className="h-8 w-8 text-muted-foreground" />}
              title="No Scheduled Streams"
              description="You haven't scheduled any streams yet."
              action={
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Stream
                </Button>
              }
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface LiveStreamCardProps {
  stream: {
    id: string
    title: string
    category: string
    startedAt: string
    viewers: number
    thumbnail: string
  }
}

function LiveStreamCard({ stream }: LiveStreamCardProps) {
  return (
    <Card>
      <div className="relative aspect-video overflow-hidden">
        <Image src={stream.thumbnail || "/placeholder.svg"} alt={stream.title} width={100} height={100} className="!h-full !w-full rounded-t-lg object-cover" />
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-background/80 px-2 py-1 backdrop-blur">
          <Badge variant="secondary" className="gap-1 bg-red-500 text-white hover:bg-red-500/90">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            LIVE
          </Badge>
          <span className="text-xs font-medium">{stream.viewers.toLocaleString()}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium line-clamp-1">{stream.title}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Stream Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Stream
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  <Trash2 className="mr-2 h-4 w-4" />
                  End Stream
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center justify-between text-sm">
            <Badge variant="outline" className="rounded-sm px-1 py-0 text-xs">
              {stream.category}
            </Badge>
            <span className="text-xs text-muted-foreground">Started {stream.startedAt}</span>
          </div>
          <div className="flex justify-between pt-2">
            <Button size="sm" variant="outline">
              View Stream
            </Button>
            <Button size="sm" variant="destructive">
              End Stream
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface PastStreamCardProps {
  stream: {
    id: string
    title: string
    category: string
    date: string
    duration: string
    views: number
    thumbnail: string
  }
}

function PastStreamCard({ stream }: PastStreamCardProps) {
  return (
    <Card>
      <div className="relative aspect-video overflow-hidden">
        <Image src={stream.thumbnail || "/placeholder.svg"} alt={stream.title} height={100} width={100} className="!h-full !w-full object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium line-clamp-1">{stream.title}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Stream Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Video className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center justify-between text-sm">
            <Badge variant="outline" className="rounded-sm px-1 py-0 text-xs">
              {stream.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{stream.date}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{stream.duration}</span>
            <span>{stream.views.toLocaleString()} views</span>
          </div>
          <Button size="sm" variant="outline" className="w-full mt-2">
            View Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface ScheduledStreamCardProps {
  stream: {
    id: string
    title: string
    category: string
    scheduledFor: string
    status: string
  }
}

function ScheduledStreamCard({ stream }: ScheduledStreamCardProps) {
  return (
    <Card>
      <CardContent className="p-4 pt-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium line-clamp-1">{stream.title}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Stream Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Play className="mr-2 h-4 w-4" />
                  Start Now
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Cancel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="rounded-sm px-1 py-0 text-xs">
              {stream.category}
            </Badge>
            {stream.status === "scheduled" ? (
              <Badge className="rounded-sm px-1 py-0 text-xs bg-green-500 hover:bg-green-500/90">Scheduled</Badge>
            ) : (
              <Badge variant="outline" className="rounded-sm px-1 py-0 text-xs">
                Draft
              </Badge>
            )}
          </div>
          <div className="flex items-center text-sm">
            <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{stream.scheduledFor}</span>
          </div>
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1">
              Edit
            </Button>
            <Button size="sm" className="flex-1">
              {stream.status === "scheduled" ? "Go Live" : "Schedule"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}

function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-10 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">{icon}</div>
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <CardDescription className="mb-6">{description}</CardDescription>
        {action}
      </CardContent>
    </Card>
  )
}

function CalendarClock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h5" />
      <path d="M17.5 17.5 16 16.25V14" />
      <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
    </svg>
  )
}

