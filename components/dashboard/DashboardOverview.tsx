import { BarChart3, Clock, Eye, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RecommendedStreams from "@/components/dashboard/RecommendedStreams"
import UpcomingStreams from "@/components/dashboard/UpcomingStreams"
import DashboardHeader from "@/components/dashboard/DashboardHeader"

export default function DashboardOverview() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Dashboard" text="Overview of your streaming activity" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+180 new followers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,024 hrs</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <p className="text-xs text-muted-foreground">+5.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Viewer Activity</CardTitle>
            <CardDescription>Viewer count over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2 flex justify-center items-center h-full w-full">
            <p className="text-muted-foreground">Viewers Activity Graph would be shown here</p>
             {/* <ViewerChart /> */}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>Your most popular streaming categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Gaming", value: 45, change: 2.5 },
                { name: "Just Chatting", value: 27, change: 1.8 },
                { name: "Music", value: 15, change: -0.5 },
                { name: "Art", value: 13, change: 3.2 },
              ].map((category) => (
                <div className="flex items-center" key={category.name}>
                  <div className="w-full flex items-center">
                    <div className="w-28 flex-shrink-0">
                      <div className="text-sm font-medium">{category.name}</div>
                    </div>
                    <div className="flex-1 mx-2">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${category.value}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      {category.value}%
                      <span className={category.change > 0 ? "text-green-500" : "text-red-500"}>
                        {category.change > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingUp className="h-3 w-3 transform rotate-180" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecommendedStreams className="col-span-4" />
        <UpcomingStreams className="col-span-3" />
      </div>
    </div>
  )
}

function ViewerChart() {
  // This is a simplified chart component
  // In a real application, you would use a library like recharts or chart.js
  const data = [
    10, 15, 8, 12, 22, 27, 24, 19, 23, 28, 25, 31, 35, 30, 40, 43, 36, 32, 38, 42, 45, 50, 48, 52, 56, 54, 60, 58, 65,
    62,
  ]

  const max = Math.max(...data)

  return (
    <div className="h-[200px] w-full">
      <div className="flex h-full items-end gap-[3px]">
        {data.map((value, i) => (
          <div
            key={i}
            className="bg-primary/90 hover:bg-primary rounded-t w-full transition-all"
            style={{
              height: `${(value / max) * 100}%`,
            }}
          >
            <div className="opacity-0 hover:opacity-100 transition-opacity text-xs text-center -mt-6">{value}K</div>
          </div>
        ))}
      </div>
    </div>
  )
}

