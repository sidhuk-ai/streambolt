"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Loader2, ArrowLeft, ArrowRight, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { checkUsernameAvailability, updateUsername } from "@/actions/user"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

interface UsernameSelectorProps {
  onContinue: () => void
  onBack: () => void
  title?: string
  subtitle?: string
}

const validateUsername = (username: string): { isValid: boolean; error?: string } => {
  if (!username) {
    return { isValid: false }
  }

  if (username.length <= 3) {
    return { isValid: false, error: "Username must be at least 3 characters long" }
  }

  if (username.length > 20) {
    return { isValid: false, error: "Username must be 20 characters or less" }
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { isValid: false, error: "Username can only contain letters, numbers, and underscores" }
  }

  if (/^[0-9]/.test(username)) {
    return { isValid: false, error: "Username cannot start with a number" }
  }

  return { isValid: true }
}

type AvailabilityStatus = "idle" | "checking" | "available" | "taken" | "error"

export default function UsernameSelector({
  onContinue,
  onBack,
  title = "Choose Your Username",
  subtitle = "Pick a unique username that represents you on StreamBolt",
}: UsernameSelectorProps) {
  const [username, setUsername] = useState("")
  const [availabilityStatus, setAvailabilityStatus] = useState<AvailabilityStatus>("idle")
  const [validationError, setValidationError] = useState<string>("")
  const [isChecking, setIsChecking] = useState(false)
  const param = useSearchParams();
  const id = param.get('signature');

  // Ye function Debounced hone wala hai
  const checkAvailability = useCallback(async (usernameToCheck: string) => {
    if (!usernameToCheck) {
      setAvailabilityStatus("idle")
      return
    }

    const validation = validateUsername(usernameToCheck)
    if (!validation.isValid) {
      setValidationError(validation.error || "")
      setAvailabilityStatus("error")
      return
    }

    setValidationError("")
    setAvailabilityStatus("checking")
    setIsChecking(true)

    try {
      const isAvailable = await checkUsernameAvailability(usernameToCheck)
      setAvailabilityStatus(isAvailable ? "available" : "taken")
    } catch (error) {
      setAvailabilityStatus("error")
      setValidationError("Unable to check username availability")
    } finally {
      setIsChecking(false)
    }
  }, [])

  // Debounce the username check
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkAvailability(username)
    }, 600)

    return () => clearTimeout(timeoutId)
  }, [username, checkAvailability])

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, "") // Remove invalid characters
    setUsername(value)
  }

  const handleContinue = () => {
    if (availabilityStatus === "available" && username) {
      updateUsername(username,id as string).then(() => {
        onContinue()
      }).catch(() => {
        toast.error("Error ocuured while updating username.");
      });
    }
  }

  const getStatusIcon = () => {
    switch (availabilityStatus) {
      case "checking":
        return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      case "available":
        return <Check className="h-4 w-4 text-green-500" />
      case "taken":
      case "error":
        return <X className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusMessage = () => {
    if (validationError) {
      return validationError
    }

    switch (availabilityStatus) {
      case "checking":
        return "Checking availability..."
      case "available":
        return "Username is available!"
      case "taken":
        return "Username is already taken"
      case "error":
        return "Unable to check availability"
      default:
        return "Enter a username to check availability"
    }
  }

  const getStatusColor = () => {
    if (validationError) {
      return "text-red-500"
    }

    switch (availabilityStatus) {
      case "checking":
        return "text-muted-foreground"
      case "available":
        return "text-green-500"
      case "taken":
      case "error":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const isContinueEnabled = availabilityStatus === "available" && username.length > 0

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <User className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <p className="text-muted-foreground text-sm leading-relaxed">{subtitle}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Username
            </Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                className={cn(
                  "pr-10 transition-colors",
                  availabilityStatus === "available" && "border-green-500 focus:border-green-500",
                  (availabilityStatus === "taken" || availabilityStatus === "error") &&
                    "border-red-500 focus:border-red-500",
                )}
                maxLength={20}
                autoComplete="username"
                autoFocus
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">{getStatusIcon()}</div>
            </div>

            {/* Real-time feedback */}
            <div className="flex items-center gap-2 min-h-[20px]">
              <p className={cn("text-xs transition-colors", getStatusColor())}>{getStatusMessage()}</p>
            </div>

            {/* Username requirements */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Username requirements:</p>
              <ul className="list-disc list-inside space-y-0.5 ml-2">
                <li>3-20 characters long</li>
                <li>Letters, numbers, and underscores only</li>
                <li>Cannot start with a number</li>
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onBack} className="flex-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <Button onClick={handleContinue} disabled={!isContinueEnabled || isChecking} className="flex-1">
              {isChecking ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
