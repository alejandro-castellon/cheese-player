import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "../ui/theme-toggle";

type Props = {};

const Navbar = async (props: Props) => {
  return (
    <header className="fixed right-0 left-0 top-0 py-2 px-8 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-blue-900 justify-between">
      <aside className="flex items-center gap-4">
        <Link href="/">
          <Image
            src="/cheeseplayer.png"
            width={55}
            height={34}
            alt="CheesePlayer logo"
          />
        </Link>
      </aside>
      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-4 list-none">
          <li>
            <Link href="/">Landing Page</Link>
          </li>
          <li>
            <Link href="/playlist">Playlist</Link>
          </li>
          <li>
            <Link href="/playlist/song">Song</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <ModeToggle />
      </aside>
    </header>
  );
};

export default Navbar;
