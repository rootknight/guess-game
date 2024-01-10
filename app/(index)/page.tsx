"use client";

import TitleCard from "@/app/ui/TitleCard";
import SelectWords from "@/app/ui/SelectWords";
import words from "@/app/data/words.json";

export default function page() {
  return (
    <div className="bg-gradient-to-r from-[#FF9D6C] to-[#BB4E75]">
      <div className="container mx-auto flex flex-col gap-4 p-4 h-dvh relative">
        <TitleCard title={"你比我猜"} />
        <div className="grid grid-cols-2 gap-2 overflow-y-auto">
          <SelectWords title={"随机"} />
          <SelectWords title={"热门"} />
          {Object.keys(words).map((key) => (
            <SelectWords key={key} title={key} />
          ))}
        </div>
      </div>
    </div>
  );
}
