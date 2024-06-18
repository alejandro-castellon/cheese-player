import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { songs } from "@/lib/data";

export const Playlist = () => {
  return (
    <main>
      <section className="flex">
        <Image
          width={250}
          height={250}
          src={"/bart.png"}
          alt={"image"}
          className="relative object-contain"
        />
        <h1 className="text-3xl m-5">Nombre</h1>
      </section>
      <Table>
        <TableCaption>A list of your recent cheese songs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead className="text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow key={song.id}>
              <TableCell className="font-medium">{song.id}</TableCell>
              <TableCell>{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell className="text-right">2:40</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};
