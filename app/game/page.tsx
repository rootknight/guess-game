/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import RandomWord from "@/app/ui/RandomWord";
import CountDown from "@/app/ui/CountDown";
import { useSearchParams } from "next/navigation";
import words from "@/app/data/words.json";
import useCountdown from "@/app/hooks/useCountdown";
import Link from "next/link";
import { Button, ButtonGroup } from "@nextui-org/button";

function Page() {
  let selectWords = useRef<string[]>([]);
  let title = useRef<string>("");
  //根据当前url的time获取对应时间
  const searchParams = useSearchParams();
  const [isStartCountDown, setIsStartCountDown] = useState(false);
  const timeParam: string | null = searchParams.get("time");
  const time = timeParam !== null ? parseInt(timeParam) : 60;
  //根据当前url的type获取对应词组
  const type = searchParams.get("type") ?? "random";
  if (type === "random") {
    selectWords.current = words.flatMap((obj) => obj.words);
    title.current = "随机";
  } else {
    const foundObject = words.find((obj) => obj.type === type);
    selectWords.current = foundObject?.words || [];
    title.current = foundObject?.title || "";
  }

  const [count, isEnd] = useCountdown(time, isStartCountDown);

  return (
    <div className="p-4 bg-white h-[100dvw] w-[100dvh] rotate-90 origin-top-left translate-x-[100dvw] xl:w-dvw xl:h-dvh xl:rotate-0 xl:translate-x-0">
      <div className="fixed top-8 left-8 right-8 flex flex-row justify-between content-start gap-2">
        <CountDown
          time={time}
          count={count}
          isStartCountDown={isStartCountDown}
          isEnd={isEnd}
        />
        {/* <MusicPlayer /> */}
      </div>
      <RandomWord
        type={type}
        title={title.current}
        selectedWord={selectWords.current}
        time={time}
        onStartCountDown={setIsStartCountDown}
        isEnd={isEnd}
      />
      <Link href={"/"} className=" fixed bottom-16 left-1/2 text-gray-300">
        返回
      </Link>
    </div>
  );
}
export default Page;
