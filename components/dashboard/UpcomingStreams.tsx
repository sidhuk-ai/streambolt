import { CalendarClock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UpcomingStreamsProps {
  className?: string
}

export default function UpcomingStreams({ className }: UpcomingStreamsProps) {
  // Mock data for upcoming streams
  const upcomingStreams = [
    {
      id: "upcoming-1",
      title: "Weekly Gaming Tournament",
      date: "Tomorrow, 7:00 PM",
      category: "Gaming",
      isScheduled: true,
    },
    {
      id: "upcoming-2",
      title: "Q&A Session with Fans",
      date: "Friday, 6:30 PM",
      category: "Just Chatting",
      isScheduled: true,
    },
    {
      id: "upcoming-3",
      title: "Collaborative Art Project",
      date: "Saturday, 3:00 PM",
      category: "Art",
      isScheduled: false,
    },
    {
      id: "upcoming-4",
      title: "Music Production Workshop",
      date: "Sunday, 2:00 PM",
      category: "Music",
      isScheduled: false,
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Upcoming Streams</CardTitle>
        <CardDescription>Your scheduled and draft streams</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingStreams.map((stream) => (
            <div key={stream.id} className="flex items-start gap-3 group cursor-pointer">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <CalendarClock className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium group-hover:text-primary transition-colors">{stream.title}</h4>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">{stream.date}</p>
                  <Badge variant="outline" className="rounded-sm px-1 py-0 text-[10px]">
                    {stream.category}
                  </Badge>
                  {stream.isScheduled ? (
                    <Badge className="rounded-sm px-1 py-0 text-[10px] bg-green-500 hover:bg-green-500/90">
                      Scheduled
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="rounded-sm px-1 py-0 text-[10px]">
                      Draft
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

