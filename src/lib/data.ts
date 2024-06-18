import { Song, Playlist } from "@/lib/types";

export const songs: Song[] = [
  { id: 1, src: "/audio/song1.mp3", artist: "Artist 1", title: "Song 1" },
  { id: 2, src: "/audio/song2.mp3", artist: "Artist 2", title: "Song 2" },
  { id: 3, src: "/audio/song3.mp3", artist: "Artist 3", title: "Song 3" },
];

export const playlists: Playlist[] = [
  {
    id: 1,
    name: "Your Playlist",
    summary: "Listen the latest songs from CheesePlayer",
  },
  { id: 2, name: "Playlist 2", summary: "Summary 2" },
  { id: 3, name: "Playlist 3", summary: "Summary 3" },
  { id: 4, name: "Playlist 4", summary: "Summary 4" },
  { id: 5, name: "Playlist 5", summary: "Summary 5" },
  { id: 6, name: "Playlist 6", summary: "Summary 6" },
];
