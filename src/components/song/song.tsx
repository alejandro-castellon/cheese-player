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
import { useRef, useEffect } from "react";
import { songs } from "@/lib/data";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  togglePlay,
  setVolume,
  setPreviousVolume,
  setProgress,
  setIsSeeking,
  setCurrentSongIndex,
} from "@/redux/playerSlice";

export const Song = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    play,
    volume,
    previousVolume,
    progress,
    isSeeking,
    currentSongIndex,
  } = useSelector((state: RootState) => state.player);

  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayHandler = () => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      dispatch(togglePlay());
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
      dispatch(setVolume(value[0]));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (audioRef.current.muted || volume === 0) {
        audioRef.current.muted = false;
        dispatch(setVolume(previousVolume));
        if (audioRef.current) {
          audioRef.current.volume = previousVolume / 100;
        }
      } else {
        dispatch(setPreviousVolume(volume));
        audioRef.current.muted = true;
        dispatch(setVolume(0));
      }
    }
  };

  const handleProgressChange = (value: number[]) => {
    dispatch(setProgress(value[0]));
    if (audioRef.current && isSeeking) {
      audioRef.current.currentTime =
        (value[0] / 100) * audioRef.current.duration;
    }
  };

  const handleSliderClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (audioRef.current) {
      const slider = event.currentTarget;
      const rect = slider.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const newProgress = (offsetX / rect.width) * 100;
      dispatch(setProgress(newProgress));
      audioRef.current.currentTime =
        (newProgress / 100) * audioRef.current.duration;
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      dispatch(setProgress(currentProgress));
    }
  };

  const handleSeekStart = () => {
    if (audioRef.current && play) {
      audioRef.current.pause();
    }
    dispatch(setIsSeeking(true));
  };

  const handleSeekEnd = () => {
    if (audioRef.current && isSeeking) {
      audioRef.current.currentTime =
        (progress / 100) * audioRef.current.duration;
      if (play) {
        audioRef.current.play();
      }
    }
    dispatch(setIsSeeking(false));
  };

  const skipForward = () => {
    dispatch(setCurrentSongIndex((currentSongIndex + 1) % songs.length));
  };

  const skipBack = () => {
    dispatch(
      setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length)
    );
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = songs[currentSongIndex].src;
      audioRef.current.load();
      if (play) {
        audioRef.current.play();
      }
      dispatch(setProgress(0)); // Reset progress when changing song
    }
  }, [currentSongIndex]);

  return (
    <main className="flex flex-col items-center p-24">
      <Image
        width={170}
        height={170}
        src={"/bart.png"}
        alt={"image"}
        className="relative object-contain"
      />
      <div
        className="relative my-4 w-full cursor-pointer"
        onClick={handleSliderClick}
      >
        <Slider
          value={[progress]}
          max={100}
          step={1}
          onValueChange={handleProgressChange}
          onPointerDown={handleSeekStart}
          onPointerUp={handleSeekEnd}
          className="w-full"
        />
      </div>
      <div>{songs[currentSongIndex].artist}</div>
      <div>{songs[currentSongIndex].title}</div>
      <section>
        <Button variant="outline" size="icon" onClick={skipBack}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={togglePlayHandler}>
          {play ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={skipForward}>
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
          className="flex-1 ml-2 cursor-pointer"
        />
      </section>
      <audio ref={audioRef} />
    </main>
  );
};
