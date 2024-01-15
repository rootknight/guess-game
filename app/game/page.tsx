"use client";

import clsx from "clsx";
import { useState, useEffect, useContext } from "react";
import RandomWord from "@/app/ui/RandomWord";
import CountDown from "@/app/ui/CountDown";
import words from "@/app/data/words.json";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const [isEventDisabled, setIsEventDisabled] = useState(false);
  //根据当前url的type获取对应词组
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const timeParam: string | null = searchParams.get("time");
  const time = timeParam !== null ? parseInt(timeParam) : 60;

  let selectWords: string[];
  let title: string;

  if (type === "random") {
    selectWords = words.flatMap((obj) => obj.words);
    title = "随机";
  } else {
    const foundObject = words.find((obj) => obj.type === type);
    selectWords = foundObject?.words || [];
    title = foundObject?.title || "";
  }

  const [localStorageData, setLocalStorageData] = useState<any[]>([]);
  const [successWords, setSuccessWords] = useState<any[]>([]);
  const [errorWords, setErrorWords] = useState<any[]>([]);

  const [backgroundColor, setBackgroundColor] = useState("bg-blue-500");
  const [correctText, setCorrectText] = useState("");

  const router = useRouter();

  const handleTimerEnd = () => {
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
      errorWords,
    };

    // 追加新的数据
    const updatedSelectedWords = [newData, ...parsedSelectedWords];
    // 保存到localStorage中
    localStorage.setItem("selectedWords", JSON.stringify(updatedSelectedWords));

    router.push("/settlement");
  };

  const handleSuccess = (word: string) => {
    setBackgroundColor("bg-green-500");
    setCorrectText("正确");
    setSuccessWords([...successWords, word]);
    // 1秒后重置背景颜色为蓝色
    setTimeout(() => {
      setBackgroundColor("bg-blue-500");
      setCorrectText("");
    }, 1000);
  };

  const handleError = (word: string) => {
    setBackgroundColor("bg-red-500");
    setCorrectText("跳过");
    setErrorWords([...errorWords, word]);
    // 1秒后重置背景颜色为蓝色
    setTimeout(() => {
      setBackgroundColor("bg-blue-500");
      setCorrectText("");
    }, 1000);
  };

  return (
    <div
      className={clsx(
        "w-screen h-dvh flex flex-col justify-between p-4",
        backgroundColor
      )}
    >
      <div className="flex flex-col justify-top items-center">
        <CountDown time={time} onTimerEnd={handleTimerEnd} />
      </div>
      <div className="w-full">
        <RandomWord
          words={selectWords} // 你的词语数组
          onSuccess={handleSuccess}
          onError={handleError}
          isEventDisabled={isEventDisabled}
          setIsEventDisabled={setIsEventDisabled} // 传递 setIsEventDisabled 函数
        />
        <p className="text-white text-8xl text-center">{correctText}</p>
      </div>
      <Link href={"/"} className="text-center text-gray-300">
        重新选词
      </Link>
    </div>
  );
}

export default Page;
