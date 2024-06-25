"use client";
import { Song } from "@/components/song/song";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function Home() {
  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col items-center p-24">
        <Song></Song>
      </main>
    </Provider>
  );
}
