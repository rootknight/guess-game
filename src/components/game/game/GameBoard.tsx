"use client";
import { useState, useRef, useEffect } from "react";
import useCountdown from "@/hooks/useCountdown";
import QuitModal from "@/components/game/game/QuitModal";
import RandomWord from "@/components/game/game/RandomWord";
import CountDown from "@/components/game/game/CountDown";

const GameBoard = ({
  type,
  title,
  time,
  words,
}: {
  type: string;
  title: string;
  time: number;
  words: any[];
}) => {
  const [isStartCountDown, setIsStartCountDown] = useState(false);
  const [count, isEnd] = useCountdown(time, isStartCountDown);
  const [isEarlyEnd, setIsEarlyEnd] = useState(false);
  const [sounds, setSounds] = useState<any>({});
  useEffect(() => {
    setSounds({
      countDownSound: new Audio("/sounds/countdown.mp3"),
      countDownEndSound: new Audio("/sounds/countdownend.mp3"),
      getRandomWordSound: new Audio("/sounds/getRandomWord.mp3"),
      successSound: new Audio("/sounds/success.mp3"),
      skipSound: new Audio("/sounds/skip.mp3"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (count <= 10) {
      sounds.countDownSound.play();
      navigator.vibrate(100); // 震动100毫秒
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div className="bg-white h-[100dvw] w-[100dvh] rotate-90 origin-top-left translate-x-[100dvw] xl:w-dvw xl:h-dvh xl:rotate-0 xl:translate-x-0">
      <div className="fixed top-8 left-8 right-8 flex flex-row justify-between content-start gap-2">
        <CountDown
          time={time}
          count={count}
          isStartCountDown={isStartCountDown}
          isEnd={isEnd}
        />
      </div>
      <RandomWord
        type={type}
        title={title}
        words={words}
        time={time}
        onStartCountDown={setIsStartCountDown}
        count={count}
        isEnd={isEnd}
        isEarlyEnd={isEarlyEnd}
        sounds={sounds}
      />
      <div className=" fixed bottom-16 left-1/2 text-gray-300">
        <QuitModal setIsEarlyEnd={setIsEarlyEnd} />
      </div>
    </div>
  );
};

export default GameBoard;
