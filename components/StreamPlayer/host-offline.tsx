import { WifiOff } from "lucide-react"

interface HostOfflineProps {
    username: string
}

export default function HostOffline({ username }: HostOfflineProps) {
    return (
        <div className="h-full flex flex-col space-y-4 justify-center items-center">
            <WifiOff className="h-10 w-10 text-muted-foreground" />
            <p>
                {username} is offline
            </p>
        </div>
    )
}