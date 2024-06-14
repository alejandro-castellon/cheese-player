"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SkipForward } from "lucide-react";
import { SkipBack } from "lucide-react";
import { Play } from "lucide-react";
import { Pause } from "lucide-react";
import { useState } from "react";

export const Song = () => {
  const [play, setPlay] = useState(false);
  return (
    <main className="flex flex-col items-center p-24">
      <Image
        width={170}
        height={170}
        src={"/bart.png"}
        alt={"image"}
        className=" relative  object-contain"
      />
      <div>Artist Name</div>
      <div>Title</div>
      <section className="flex">
        <Button variant="outline" size="icon">
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => setPlay(!play)}>
          {play ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon">
          <SkipForward className="h-4 w-4" />
        </Button>
      </section>
    </main>
  );
};
