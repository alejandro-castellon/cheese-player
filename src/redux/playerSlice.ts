import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerState } from "@/lib/types";

const initialPlayer: PlayerState = {
  play: false,
  volume: 50,
  previousVolume: 50,
  progress: 0,
  isSeeking: false,
  currentSongIndex: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState: initialPlayer,
  reducers: {
    togglePlay(state) {
      state.play = !state.play;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    setPreviousVolume(state, action: PayloadAction<number>) {
      state.previousVolume = action.payload;
    },
    setProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
    setIsSeeking(state, action: PayloadAction<boolean>) {
      state.isSeeking = action.payload;
    },
    setCurrentSongIndex(state, action: PayloadAction<number>) {
      state.currentSongIndex = action.payload;
    },
  },
});

export const {
  togglePlay,
  setVolume,
  setPreviousVolume,
  setProgress,
  setIsSeeking,
  setCurrentSongIndex,
} = playerSlice.actions;

export default playerSlice.reducer;
