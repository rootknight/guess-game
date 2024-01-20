"use client";
import MusicPlayer from "@/app/ui/MusicPlayer";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-row justify-between align-middle bg-white rounded-lg p-4 shadow-lg">
      <h1 className="align-middle text-2xl text-black">{title}</h1>
      <MusicPlayer />
    </div>
  );
};

export default Header;
