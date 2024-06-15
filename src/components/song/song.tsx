"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  SkipForward,
  SkipBack,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState, useRef, useEffect } from "react";

export const Song = () => {
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlay(!play);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
      setVolume(value[0]);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (audioRef.current.muted || volume === 0) {
        audioRef.current.muted = false;
        setVolume(previousVolume);
        if (audioRef.current) {
          audioRef.current.volume = previousVolume / 100;
        }
      } else {
        setPreviousVolume(volume);
        audioRef.current.muted = true;
        setVolume(0);
      }
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        (value[0] / 100) * audioRef.current.duration;
      setProgress(value[0]);
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;

      // Añadir un event listener para actualizar el progreso
      audioRef.current.addEventListener("timeupdate", updateProgress);
    }

    // Limpiar el event listener al desmontar el componente
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [volume]);

  return (
    <main className="flex flex-col items-center p-24">
      <Image
        width={170}
        height={170}
        src={"/bart.png"}
        alt={"image"}
        className="relative object-contain"
      />
      <Slider
        value={[progress]}
        max={100}
        step={1}
        onValueChange={handleProgressChange}
        className="my-4"
      />
      <div>Artist Name</div>
      <div>Title</div>
      <section className="flex">
        <Button variant="outline" size="icon">
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={togglePlay}>
          {play ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon">
          <SkipForward className="h-4 w-4" />
        </Button>
      </section>
      <section className="flex w-full items-center mt-4">
        <Button variant="outline" size="icon" onClick={toggleMute}>
          {volume > 0 ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </Button>
        <Slider
          defaultValue={[50]}
          value={[volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="flex-1 ml-2"
        />
      </section>
      <audio ref={audioRef} src="/audio/song.mp3" />
    </main>
  );
};
