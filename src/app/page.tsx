import React from "react";
import { PlaylistContainer } from "@/components/playlist/playlist-container";
import { playlists } from "@/lib/data";

export default function Home() {
  return (
    <main className="px-10 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div key={playlist.id}>
            <PlaylistContainer
              name={playlist.name}
              summary={playlist.summary}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
