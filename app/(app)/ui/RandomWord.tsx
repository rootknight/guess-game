/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import useThrottle from "@/app/(app)/hooks/useThrottle";
import useCountdown from "@/app/(app)/hooks/useCountdown";
import ScoreBoard from "@/app/(app)/ui/ScoreBoard";

const RandomWord = ({
  type,
  title,
  selectedWord,
  time,
  onStartCountDown,
  isEnd,
}: {
  type: string;
  title: string;
  selectedWord: string[];
  time: number;
  onStartCountDown: any;
  isEnd: boolean;
}) => {
  const [backgroundColor, setBackgroundColor] = useState("bg-blue-500");
  const [displayedText, setDisplayedText] = useState<any>("");
  const router = useRouter();

  let extractedWord = useRef<string>("");
  let successWords = useRef<string[]>([]);
  let skipWords = useRef<string[]>([]);
  let extractedWords = useRef<string[]>([]);

  const [isExtractedOver, setIsExtractedOver] = useState<boolean>(false);

  const [readyCount, isReadyEnd] = useCountdown(6, true);

  //准备6秒
  useEffect(() => {
    if (!isReadyEnd) {
      setBackgroundColor("bg-amber-500");
      if (readyCount >= 4) {
        if (window.innerWidth >= 640) {
          setDisplayedText("请猜词者背对屏幕");
        } else if (window.innerWidth < 640) {
          setDisplayedText("请横向举起屏幕");
        }
      } else {
        const countDownSound = new Audio("/countdown.mp3");
        countDownSound.play();
        setDisplayedText(`准备: ${readyCount}`);
      }
    } else {
      const countDownEndSound = new Audio("/countdownend.mp3");
      countDownEndSound.play();
      navigator.vibrate(100); // 震动100毫秒
      getRandomWord();
      onStartCountDown(true);
    }
  }, [readyCount, isReadyEnd]);

  // 获取过去1小时的记录以过滤后使用
  useEffect(() => {
    const storedextractedWords = localStorage.getItem("extractedWords");
    const parsedextractedWords =
      storedextractedWords !== null ? JSON.parse(storedextractedWords) : [];

    const currentTime = new Date().getTime();
    const oneHourInMillis = 60 * 60 * 1000; // 1小时的毫秒数

    // 过滤出过去1小时内的数据
    const filteredextractedWords = parsedextractedWords.filter((word: any) => {
      const wordTimestamp = new Date(word.timestamp).getTime();
      return currentTime - wordTimestamp <= oneHourInMillis;
    });
    // 更新状态
    extractedWords.current = filteredextractedWords;
  }, []);

  // 从剩余可选词组随机抽词
  const getRandomWord = () => {
    setBackgroundColor("bg-blue-500");
    const getRandomWordSound = new Audio("/getRandomWord.mp3");
    getRandomWordSound.play();
    const remainingWords = selectedWord.filter(
      (word) => !extractedWords.current.includes(word)
    );
    if (remainingWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingWords.length);
      extractedWord.current = remainingWords[randomIndex];
      setDisplayedText(remainingWords[randomIndex]);
    } else {
      // 如果所有词都已选完，可以进行一些处理，例如重新洗牌词汇数组
      setDisplayedText("egg:所有词都抽完了😎");
      setIsExtractedOver(() => {
        return true;
      });
    }
  };

  // 键盘按下后，1秒后重置背景颜色为蓝色并重新抽词
  const reRandomWord = () => {
    setTimeout(() => {
      getRandomWord();
    }, 1000);
  };

  const onSuccess = (word: string) => {
    // 播放成功音效
    const successSound = new Audio("/success.mp3");
    successSound.play();
    //设置背景颜色为绿色
    setDisplayedText("正确");
    setBackgroundColor("bg-green-500");
    successWords.current = [...successWords.current, word];
    // console.log(successWords.current);
  };

  const onSkip = (word: string) => {
    // 播放跳过音效
    const skipSound = new Audio("/skip.mp3");
    skipSound.play();
    //设置背景颜色为红色
    setDisplayedText("跳过");
    setBackgroundColor("bg-rose-500");
    skipWords.current = [...skipWords.current, word];

    // console.log(skipWords.current);
  };

  // 键盘动作
  const handleKeyPress = (event: any) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      onSuccess(extractedWord.current);
      reRandomWord();
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      onSkip(extractedWord.current);
      reRandomWord();
    }
  };

  let isForward = useRef<boolean>(true);
  let isReset = useRef<boolean>(true);
  let isBackward = useRef<boolean>(true);

  //翻转手机动作
  const handleOrientation = (event: any) => {
    const gamma = Math.round(event.gamma);

    // 向前翻转
    if (!isForward.current && gamma > 0 && gamma <= 45) {
      isForward.current = true;
      isReset.current = false;
      isBackward.current = true;
      navigator.vibrate(100); // 震动200毫秒
      onSuccess(extractedWord.current);
    }

    //翻转回原位
    if (
      !isReset.current &&
      ((gamma >= 55 && gamma <= 90) || (gamma >= -90 && gamma <= -55))
    ) {
      isForward.current = true;
      isReset.current = false;
      isBackward.current = true;
      // navigator.vibrate(100);
      getRandomWord();
    }

    // 向后翻转
    if (!isBackward.current && gamma >= -45 && gamma < 0) {
      isForward.current = true;
      isReset.current = false;
      isBackward.current = true;
      navigator.vibrate(100); // 震动200毫秒
      onSkip(extractedWord.current);
    }

    // 处理角度0
    if (gamma === 0) {
      isForward.current = true;
      isReset.current = false;
      isBackward.current = true;
    }
  };

  // 节流包裹动作
  const throttledKeyPress = useThrottle(handleKeyPress, 1000);
  const throttledOrientation = useThrottle(handleOrientation, 10);

  // 添加键盘事件监听器
  useEffect(() => {
    if (!isEnd && isReadyEnd) {
      document.body.addEventListener("keydown", throttledKeyPress);
    }

    // 在组件卸载时移除事件监听器，防止内存泄漏
    return () => {
      document.body.removeEventListener("keydown", throttledKeyPress);
    };
  }, [isEnd, isReadyEnd, throttledKeyPress]);

  // 添加螺旋仪事件监听器
  useEffect(() => {
    if (!isEnd && isReadyEnd) {
      window.addEventListener("deviceorientation", throttledOrientation);
    }
    // 在组件卸载时移除事件监听器，防止内存泄漏
    return () => {
      window.removeEventListener("deviceorientation", throttledOrientation);
    };
  }, [isEnd, isReadyEnd, throttledOrientation]);

  //结束后保存记录到LocalStorage
  useEffect(() => {
    if (isEnd || isExtractedOver) {
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
        successWords: successWords.current,
        skipWords: skipWords.current,
      };
      // 追加新的数据
      const updatedSelectedWords = [newData, ...parsedSelectedWords];
      // 保存到localStorage中
      localStorage.setItem(
        "selectedWords",
        JSON.stringify(updatedSelectedWords)
      );
      router.push("/settlement");
    }
  }, [isEnd, isExtractedOver]);

  return (
    <div
      className={clsx(
        "h-full w-full flex flex-col justify-center p-4 rounded-lg",
        backgroundColor
      )}
    >
      <p className="text-white text-6xl md:text-8xl text-center">
        {displayedText}
      </p>
      <ScoreBoard
        successWords={successWords.current}
        skipWords={skipWords.current}
      />
    </div>
  );
};

export default RandomWord;

//退出全屏
const exitFullscreen = () => {
  if (document.fullscreenElement) {
    // 检查当前是否处于全屏状态
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
