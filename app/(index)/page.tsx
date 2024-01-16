"use client";

import TitleCard from "@/app/ui/TitleCard";
import SelectWords from "@/app/ui/SelectWords";
import words from "@/app/data/words.json";

export default function Page() {
  return (
    <div className="grid grid-cols-2 gap-2 overflow-y-auto">
      <SelectWords title={"随机"} type={"random"} />
      {words.map((item) => (
        <SelectWords key={item.type} type={item.type} title={item.title} />
      ))}
    </div>
  );
}
