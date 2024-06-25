export interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
}
export interface Playlist {
  id: number;
  name: string;
  summary: string;
}

export interface PlayerState {
  play: boolean;
  volume: number;
  previousVolume: number;
  progress: number;
  isSeeking: boolean;
  currentSongIndex: number;
}
