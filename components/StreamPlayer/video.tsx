"use client";

import { useConnectionState, useRemoteParticipant, useTracks } from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";
import HostOffline from "./host-offline";
import StreamLoading from "./stream-loading";
import LiveVideo from "./live-video";
import { Skeleton } from "../ui/skeleton";

interface VideoPageProps {
    hostName: string;
    hostIdentity: string
}

export default function Video({
    hostName,
    hostIdentity
}: VideoPageProps) {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === hostIdentity);

    let content;
    if(!participant && ConnectionState.Connected){
        content = <HostOffline username={hostName} />;
    }else if(!participant || tracks.length === 0) {
        content = <StreamLoading label={connectionState} />;
    }else{
        content = <LiveVideo participant={participant} />;
    }

    return(
        <div className="aspect-video border mx-2 rounded-md group relative">
            {content}
        </div>
    )
}

export const VideoSkeleton = () => {
    return (
        <div className="aspect-video border mx-2 rounded-md border-background">
            <Skeleton className="h-full w-full rounded-md" />
        </div>
    )
}