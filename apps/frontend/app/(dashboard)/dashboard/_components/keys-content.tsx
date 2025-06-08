"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import KeysModal from "./keys-modal";

export default function KeysContent() {
  const [autoRecord, setAutoRecord] = useState(true)
  const [show, setShow] = useState(false)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex md:flex-row justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>Stream Configuration</CardTitle>
            <CardDescription>Configure your stream settings and defaults</CardDescription>
          </div>
          <div className="m-3">
            <KeysModal />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stream-key">Stream Key</Label>
            <div className="flex gap-2">
              <Input id="stream-key" type={show ? "text" : "password"} defaultValue="sk_live_12345678" readOnly />
              <Button variant="outline" size="sm">
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
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