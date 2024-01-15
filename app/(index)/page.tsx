"use client";

import TitleCard from "@/app/ui/TitleCard";
import SelectWords from "@/app/ui/SelectWords";
import words from "@/app/data/words.json";
import { useEffect } from "react";

export default function Page() {
  return (
    <div className="bg-gradient-to-r from-[#FF9D6C] to-[#BB4E75]">
      <div className="container mx-auto flex flex-col gap-4 p-4 h-dvh relative">
        <TitleCard title={"你比我猜"} />
        <div className="grid grid-cols-2 gap-2 overflow-y-auto">
          <SelectWords title={"随机"} type={"random"} />
          {words.map((item) => (
            <SelectWords key={item.type} type={item.type} title={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
