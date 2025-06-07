"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"

export default function Settings() {
  const { data: session } = useSession();
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Settings" text="Manage your account settings and preferences" />

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="cursor-pointer">Profile</TabsTrigger>
          <TabsTrigger value="account" className="cursor-pointer">Account</TabsTrigger>
          <TabsTrigger value="notifications" className="cursor-pointer">Notifications</TabsTrigger>
          <TabsTrigger value="stream" className="cursor-pointer">Stream Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <ProfileSettings session={session} />
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <AccountSettings session={session} />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="stream" className="space-y-4">
          <StreamSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProfileSettings({session}:{session:Session | null}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your profile information visible to other users</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-muted overflow-hidden">
              <Avatar>
                <AvatarImage
                  src={session?.user?.image ?? "/placeholder.svg?height=80&width=80&text=U"}
                  alt={session?.user?.name?.slice(0,2) ?? "User avatar"} 
                />
              </Avatar>
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
              <p className="text-xs text-muted-foreground">JPG or PNG. Max size 2MB.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="display-name">Display Name</Label>
            <Input id="display-name" defaultValue={session?.user?.name ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue={"streamuser_"+session?.user?.id?.slice(-4)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell viewers about yourself..."
            defaultValue="Content creator passionate about gaming and art. Streaming since 2022."
            className="min-h-[100px]"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="City, Country" defaultValue="New York, USA" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" placeholder="https://yourwebsite.com" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}

function AccountSettings({session}:{session:Session | null}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your account details and email preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={session?.user?.email ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Update Email</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Change Password</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border border-destructive/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all of your content</p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Choose how and when you want to be notified</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <div className="space-y-3">
            {[
              { id: "email-followers", label: "New followers" },
              { id: "email-comments", label: "Comments on your streams" },
              { id: "email-mentions", label: "Mentions and tags" },
              { id: "email-newsletter", label: "StreamBolt newsletter and updates" },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                  {item.label}
                </Label>
                <Switch id={item.id} defaultChecked={item.id !== "email-newsletter"} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Push Notifications</h3>
          <div className="space-y-3">
            {[
              { id: "push-streams", label: "Followed streamers go live" },
              { id: "push-followers", label: "New followers" },
              { id: "push-comments", label: "Comments on your streams" },
              { id: "push-mentions", label: "Mentions and tags" },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                  {item.label}
                </Label>
                <Switch id={item.id} defaultChecked />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Reset to Default</Button>
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}

function StreamSettings() {
  const [autoRecord, setAutoRecord] = useState(true)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Stream Configuration</CardTitle>
          <CardDescription>Configure your stream settings and defaults</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stream-key">Stream Key</Label>
            <div className="flex gap-2">
              <Input id="stream-key" type="password" defaultValue="sk_live_12345678" readOnly />
              <Button variant="outline" size="sm">
                Copy
              </Button>
              <Button variant="outline" size="sm">
                Reset
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Use this key in your streaming software. Never share your stream key with anyone.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stream-url">Stream URL</Label>
            <Input id="stream-url" defaultValue="rtmp://stream.streambolt.com/live" readOnly />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-record">Auto-Record Streams</Label>
              <p className="text-xs text-muted-foreground">Automatically record your streams for later viewing</p>
            </div>
            <Switch id="auto-record" checked={autoRecord} onCheckedChange={setAutoRecord} />
          </div>

          {autoRecord && (
            <div className="space-y-2">
              <Label htmlFor="recording-quality">Recording Quality</Label>
              <select
                id="recording-quality"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="source">Source Quality</option>
                <option value="high">High (1080p)</option>
                <option value="medium">Medium (720p)</option>
                <option value="low">Low (480p)</option>
              </select>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stream Customization</CardTitle>
          <CardDescription>Customize the appearance of your stream page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stream-title-template">Default Stream Title Template</Label>
            <Input
              id="stream-title-template"
              placeholder="e.g., {game} with {username}"
              defaultValue="Streaming {game} - Come hang out!"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stream-description-template">Default Stream Description Template</Label>
            <Textarea
              id="stream-description-template"
              placeholder="Enter a default description for your streams"
              className="min-h-[100px]"
              defaultValue="Welcome to my stream! Don't forget to follow for notifications when I go live."
            />
          </div>

          <div className="space-y-2">
            <Label>Default Tags</Label>
            <div className="flex flex-wrap gap-2">
              <div className="flex h-8 items-center rounded-md bg-muted px-2 text-sm">
                English
                <button className="ml-1 rounded-full hover:bg-muted-foreground/20">
                  <span className="sr-only">Remove</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="flex h-8 items-center rounded-md bg-muted px-2 text-sm">
                Gaming
                <button className="ml-1 rounded-full hover:bg-muted-foreground/20">
                  <span className="sr-only">Remove</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="flex h-8 items-center rounded-md bg-muted px-2 text-sm">
                Casual
                <button className="ml-1 rounded-full hover:bg-muted-foreground/20">
                  <span className="sr-only">Remove</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                Add Tag
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Customization</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

