"use client";
import MusicPlayer from "@/app/ui/MusicPlayer";

const Header = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row justify-between bg-white rounded-lg p-4 shadow-lg">
      <h1 className="flex items-center text-2xl  text-black">{title}</h1>
      {/* <MusicPlayer /> */}
      {children}
    </div>
  );
};

export default Header;
