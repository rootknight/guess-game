"use client";

import SelectWords from "@/app/ui/SelectWords";
import words from "@/app/data/words.json";
import Header from "@/app/ui/Header";

export default function Page() {
  return (
    <div className=" w-screen h-dvh p-4 flex flex-col gap-4">
      <Header title="你比我猜" />
      <div className="h-full grid grid-cols-2 gap-2 content-start overflow-y-auto">
        <SelectWords title={"随机"} type={"random"} />
        {words.map((item) => (
          <SelectWords key={item.type} type={item.type} title={item.title} />
        ))}
      </div>
    </div>
  );
}
