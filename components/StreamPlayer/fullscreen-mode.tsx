import { Maximize, Minimize } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FullScreenProps {
    isFullscreen: boolean;
    onToggle: () => void;
}

export default function FullScreen({
    isFullscreen,
    onToggle
}:FullScreenProps) {
    const Icon = isFullscreen ? Minimize : Maximize;
    const label = isFullscreen ? "Exit Fullscreen" : "Fullscreen";
    return (
        <div className="flex items-center justify-center gap-4">
            <Tooltip>
                <TooltipTrigger asChild>
                    <button onClick={onToggle} className="text-white hover:text-white/60 rounded-lg">
                        <Icon className="h-5 w-5" />
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    {label}
                </TooltipContent>
            </Tooltip>
        </div>
    )
}