import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AtSign, Link, Mail, MapPin, Phone, User as User2 } from "lucide-react";
import { User } from "@prisma/client";

interface SettingProps {
  user: Partial<User>;
}

export default async function Settings({ user }: SettingProps) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader
        heading="Settings"
        text="Manage your account settings and preferences"
      />

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="cursor-pointer">
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="cursor-pointer">
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="cursor-pointer">
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <ProfileSettings user={user} />
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <AccountSettings user={user} />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileSettings({ user }: { user: Partial<User> | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your profile information visible to other users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-muted overflow-hidden">
              <Avatar className="w-full h-full">
                <AvatarImage
                  src={
                    user?.imageUrl ??
                    "/placeholder.svg?height=80&width=80&text=U"
                  }
                  alt={user?.name?.slice(0, 2) ?? "User avatar"}
                />
              </Avatar>
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG or PNG. Max size 2MB.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="display-name">Display Name</Label>
            <div className="relative">
              <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                <User2 className="h-4 w-4" />
              </div>
              <Input
                id="display-name"
                defaultValue={user?.name ?? ""}
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                <AtSign className="h-4 w-4" />
              </div>
              <Input
                id="username"
                defaultValue={user?.username ?? ""}
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>
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
            <div className="relative">
              <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                <MapPin className="h-4 w-4" />
              </div>
              <Input
                id="location"
                placeholder="City, Country"
                defaultValue="New York, USA"
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                <Link className="h-4 w-4" />
              </div>
              <Input
                id="website"
                placeholder="https://yourwebsite.com"
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

function AccountSettings({ user }: { user: Partial<User> }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Update your account details and email preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email ?? ""}
                  className="w-full rounded-lg bg-background pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <div className="relative">
                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-lg bg-background pl-8"
                />
              </div>
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
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
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
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border border-destructive/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all of your content
                </p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose how and when you want to be notified
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <div className="space-y-3">
            {[
              { id: "email-followers", label: "New followers" },
              { id: "email-comments", label: "Comments on your streams" },
              { id: "email-mentions", label: "Mentions and tags" },
              {
                id: "email-newsletter",
                label: "StreamBolt newsletter and updates",
              },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                  {item.label}
                </Label>
                <Switch
                  id={item.id}
                  defaultChecked={item.id !== "email-newsletter"}
                />
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
  );
}
