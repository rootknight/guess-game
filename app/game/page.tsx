"use client";

import { useState, useEffect, useRef } from "react";
import RandomWord from "@/app/ui/RandomWord";
import CountDown from "@/app/ui/CountDown";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import words from "@/app/data/words.json";
import Image from "next/image";

function Page() {
  const router = useRouter();
  //根据当前url的time获取对应时间
  const searchParams = useSearchParams();
  const [successWords, setSuccessWords] = useState<string[]>([]);
  const [skipWords, setSkipWords] = useState<string[]>([]);
  const [isStartCountDown, setIsStartCountDown] = useState(false);
  const timeParam: string | null = searchParams.get("time");
  const time = timeParam !== null ? parseInt(timeParam) : 60;

  let selectWords: string[];
  let title: string;

  //根据当前url的type获取对应词组
  const type = searchParams.get("type");
  if (type === "random") {
    selectWords = words.flatMap((obj) => obj.words);
    title = "随机";
  } else {
    const foundObject = words.find((obj) => obj.type === type);
    selectWords = foundObject?.words || [];
    title = foundObject?.title || "";
  }

  //退出全屏
  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      // 检查当前是否处于全屏状态
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  //倒计时结束动作
  const handleTimerEnd = () => {
    // 播放gameover音效
    const gameOverSound = new Audio("/gameover.mp3");
    gameOverSound.play();

    exitFullscreen();

    //将抽取过的词存入LocalStorage
    // 获取之前的数据
    const storedSelectedWords = localStorage.getItem("selectedWords");
    const parsedSelectedWords =
      storedSelectedWords !== null ? JSON.parse(storedSelectedWords) : [];

    // 新的数据
    const newData = {
      title: title,
      type: type,
      time: time,
      endTime: new Date().getTime(),
      successWords,
      skipWords,
    };

    // 追加新的数据
    const updatedSelectedWords = [newData, ...parsedSelectedWords];
    // 保存到localStorage中
    localStorage.setItem("selectedWords", JSON.stringify(updatedSelectedWords));
    router.push("/settlement");
  };

  //强制全屏

  return (
    <div className="p-4 h-[100dvw] w-[100dvh] rotate-90 origin-top-left translate-x-[100dvw] md:w-dvw md:h-dvh md:rotate-0 md:translate-x-0">
      <div className="fixed top-8 left-8 right-8 flex flex-row justify-between content-start gap-2">
        {/* <Link href={"/"} className=" text-gray-300">
            返回
          </Link> */}
        <CountDown
          time={time}
          isStartCountDown={isStartCountDown}
          onTimerEnd={handleTimerEnd}
        />
        {/* <MusicPlayer /> */}
      </div>
      <div className="fixed left-8 bottom-8 flex flex-col items-center gap-2">
        <p className="text-white text-4xl">跳过 {skipWords.length}</p>
        <Image
          src="/arrowSkip.png"
          width={128}
          height={64}
          alt="skip"
          className="opacity-30 hidden md:block"
        />
        <Image
          src="/phoneSkip.png"
          width={128}
          height={64}
          alt="skip"
          className="opacity-30 md:hidden"
        />
      </div>
      <div className="fixed right-8 bottom-8 flex flex-col items-center gap-2">
        <p className="text-white text-4xl">成功 {successWords.length}</p>
        <Image
          src="/arrowSuccess.png"
          width={128}
          height={64}
          alt="skip"
          className="opacity-30 hidden md:block"
        />
        <Image
          src="/phoneSuccess.png"
          width={128}
          height={64}
          alt="skip"
          className="opacity-30 md:hidden"
        />
      </div>
      <RandomWord
        words={selectWords}
        onStartCountDown={setIsStartCountDown}
        onSuccessWords={setSuccessWords}
        onSkipWords={setSkipWords}
        onEmptyWords={handleTimerEnd}
      />
    </div>
  );
}

export default Page;
