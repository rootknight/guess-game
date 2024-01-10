"use client";

import clsx from "clsx";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import words from "@/app/data/words.json";
import CountDown from "@/app/ui/CountDown";
import { useState, useEffect } from "react";

function page() {
  const [backgroundColor, setBackgroundColor] = useState("bg-blue-500");
  const [currentWord, setCurrentWord] = useState("");

  setBackgroundColor(() => {
    const color = Math.floor(Math.random() * 4);
    switch (color) {
      case 0:
        return "bg-blue-500";
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
    }
  });

  return (
    <div
      className={clsx(
        "w-screen h-dvh flex flex-col justify-between p-4",
        backgroundColor
      )}
    >
      <div className="flex flex-col justify-top items-center">
        <CountDown totalTime={180} />
        <p className="text-white text-3xl md:text-4xl">180秒</p>
      </div>
      <div className="w-full">
        <h1 className="text-center text-white text-6xl md:text-8xl">
          {currentWord}
        </h1>
      </div>
      <footer className="grid grid-cols-2 gap-4">
        <Button as={Link} href={"/"} color="success">
          重新选词
        </Button>
        <Button as={Link} href={"/settlement"} color="success">
          结束游戏
        </Button>
      </footer>
    </div>
  );
}

export default page;
