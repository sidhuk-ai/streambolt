"use client";

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import FullScreen from "./fullscreen-mode";
import VolumeControl from "./volume-control";
import ChatToggle from "./chat-toggle";

interface LiveVideoProps {
  participant: Participant;
}

export default function LiveVideo({ participant }: LiveVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

    const onVolumeChange = (value:number) => {
      setVolume(+value);
      if(videoRef?.current) {
        videoRef.current.muted = value === 0;
        videoRef.current.volume = +value * 0.01;
      }
    }

    const toggleMute = () => {
      const isMuted = volume === 0;
      setVolume(isMuted ? 50 : 0);

      if(videoRef?.current) {
        videoRef.current.muted = !isMuted;
        videoRef.current.volume = isMuted ? 0.5 : 0;
      }
    }

  const toggleFullscreen = () => {
    if (fullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null;
    setFullscreen(isCurrentlyFullScreen);
  }

  useEffect(() => {
    onVolumeChange(0);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-t from-neutral-900 px-4">
          <VolumeControl onChange={onVolumeChange} onToggle={toggleMute} value={volume} />
          <div className="flex gap-4">
            <ChatToggle />
            <FullScreen isFullscreen={fullscreen} onToggle={toggleFullscreen} />
          </div>
        </div>
      </div>
    </div>
  );
}
