import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard/DashboardHeader"

export default function Analytics() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Analytics" text="View detailed statistics about your streams and audience" />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Total Views" value="45.2K" change="+20.1%" trend="up" />
            <MetricCard title="Watch Time" value="1,024 hrs" change="+12.3%" trend="up" />
            <MetricCard title="Avg. Viewers" value="1,250" change="+5.7%" trend="up" />
            <MetricCard title="New Followers" value="180" change="-2.5%" trend="down" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Viewer Retention</CardTitle>
                <CardDescription>Average watch time per viewer</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <RetentionChart />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Audience Growth</CardTitle>
                <CardDescription>New followers over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <GrowthChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stream Performance</CardTitle>
              <CardDescription>Comparison of your recent streams</CardDescription>
            </CardHeader>
            <CardContent>
              <StreamPerformanceTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
              <CardDescription>Viewer age, location, and device information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Detailed audience analytics would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>Analytics for your content by category and type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Detailed content analytics would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Earnings from subscriptions, donations, and ads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Detailed revenue analytics would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
}

function MetricCard({ title, value, change, trend }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"}`}>{change} from last month</p>
      </CardContent>
    </Card>
  )
}

function RetentionChart() {
  // This is a simplified chart component
  // In a real application, you would use a library like recharts or chart.js
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center text-muted-foreground">Retention chart visualization would appear here</div>
    </div>
  )
}

function GrowthChart() {
  // This is a simplified chart component
  // In a real application, you would use a library like recharts or chart.js
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center text-muted-foreground">Growth chart visualization would appear here</div>
    </div>
  )
}

function StreamPerformanceTable() {
  const streams = [
    {
      title: "Friday Night Gaming Marathon",
      date: "Mar 10, 2025",
      duration: "4h 15m",
      avgViewers: 1250,
      maxViewers: 1800,
      newFollowers: 45,
    },
    {
      title: "Art Creation Session",
      date: "Mar 8, 2025",
      duration: "3h 24m",
      avgViewers: 950,
      maxViewers: 1200,
      newFollowers: 32,
    },
    {
      title: "Just Chatting with Viewers",
      date: "Mar 5, 2025",
      duration: "1h 45m",
      avgViewers: 820,
      maxViewers: 1050,
      newFollowers: 28,
    },
    {
      title: "Music Production Walkthrough",
      date: "Mar 1, 2025",
      duration: "2h 10m",
      avgViewers: 1100,
      maxViewers: 1350,
      newFollowers: 38,
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-2 font-medium">Stream</th>
            <th className="text-left py-3 px-2 font-medium">Date</th>
            <th className="text-left py-3 px-2 font-medium">Duration</th>
            <th className="text-left py-3 px-2 font-medium">Avg. Viewers</th>
            <th className="text-left py-3 px-2 font-medium">Peak Viewers</th>
            <th className="text-left py-3 px-2 font-medium">New Followers</th>
          </tr>
        </thead>
        <tbody>
          {streams.map((stream, i) => (
            <tr key={i} className="border-b hover:bg-muted/50">
              <td className="py-3 px-2">{stream.title}</td>
              <td className="py-3 px-2">{stream.date}</td>
              <td className="py-3 px-2">{stream.duration}</td>
              <td className="py-3 px-2">{stream.avgViewers.toLocaleString()}</td>
              <td className="py-3 px-2">{stream.maxViewers.toLocaleString()}</td>
              <td className="py-3 px-2">{stream.newFollowers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

