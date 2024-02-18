"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import useThrottle from "@/hooks/useThrottle";
import useCountdown from "@/hooks/useCountdown";
import ScoreBoard from "@/components/game/game/ScoreBoard";
import dayjs from "dayjs";

const RandomWord = ({
  type,
  title,
  words,
  time,
  onStartCountDown,
  count,
  isEnd,
  isEarlyEnd,
  sounds,
}: {
  type: string;
  title: string;
  words: string[];
  time: number;
  onStartCountDown: any;
  count: number;
  isEnd: boolean;
  isEarlyEnd: boolean;
  sounds: any;
}) => {
  const [bgColor, setBgColor] = useState("bg-blue-500");
  const [disText, setDisText] = useState<any>("");
  const router = useRouter();

  let extractedWord = useRef<string>("");
  let extractedWords = useRef<string[]>([]);
  let successWords = useRef<string[]>([]);
  let skipWords = useRef<string[]>([]);

  const [isExtractedOver, setIsExtractedOver] = useState<boolean>(false);
  const [readyCount, isReadyEnd] = useCountdown(6, true);

  // 获取过去1小时的记录以过滤后使用
  useEffect(() => {
    const storedWordsJSON = localStorage.getItem("words");
    const storedWords = JSON.parse(storedWordsJSON || "[]");
    const nowUNIX = dayjs().valueOf();
    const filteredWords = storedWords.filter(
      (item: any) => nowUNIX - item.endTime < 3600000
    );
    const last1HourWords = filteredWords.reduce((result: any[], item: any) => {
      result.push(...item.successWords, ...item.skipWords);
      return result;
    }, []);
    extractedWords.current = last1HourWords;
  }, []);

  //准备6秒
  useEffect(() => {
    if (readyCount >= 4) {
      //准备提示
      if (window.innerWidth >= 1280) {
        setDisText("请猜词者背对屏幕");
      } else if (window.innerWidth < 1280) {
        setDisText("请横向举在头顶");
      }
    } else if (readyCount <= 3 && readyCount > 0) {
      //准备倒计时
      sounds.countDownSound.play();
      setDisText(`准备: ${readyCount}`);
    }

    //准备结束
    if (isReadyEnd) {
      sounds.countDownEndSound.play();
      navigator.vibrate(100); // 震动100毫秒
      getRandomWord();
      onStartCountDown(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyCount, isReadyEnd]);

  // 从剩余可选词组随机抽词
  const getRandomWord = () => {
    setBgColor("bg-blue-500");
    sounds.getRandomWordSound.play();
    // 从剩余可选词组中随机抽取一个
    const remainingWords = words.filter(
      (word) => !extractedWords.current.includes(word)
    );
    if (remainingWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingWords.length);
      extractedWord.current = remainingWords[randomIndex];
      setDisText(remainingWords[randomIndex]);
    } else {
      // 如果所有词都已选完，可以进行一些处理，例如重新洗牌词汇数组
      setDisText("所有词都抽完了🤣");
      setTimeout(() => {
        setIsExtractedOver(() => {
          return true;
        });
      }, 2000);
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
    sounds.successSound.play();
    //设置背景颜色为绿色
    setDisText("正确");
    setBgColor("bg-green-500");
    successWords.current = [...successWords.current, word];
    extractedWords.current = [...extractedWords.current, word];
  };

  const onSkip = (word: string) => {
    // 播放跳过音效
    sounds.skipSound.play();
    //设置背景颜色为红色
    setDisText("跳过");
    setBgColor("bg-rose-500");
    skipWords.current = [...skipWords.current, word];
    extractedWords.current = [...extractedWords.current, word];
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

  const forToggle = useRef<boolean>(true);
  const resToggle = useRef<boolean>(false);
  const bacToggle = useRef<boolean>(true);

  //翻转手机动作
  const handleOrientation = (event: any) => {
    const gamma = Math.round(event.gamma);

    // 向前翻转
    if (forToggle.current && gamma > 0 && gamma <= 45) {
      navigator.vibrate(100); // 震动200毫秒
      onSuccess(extractedWord.current);
      forToggle.current = false;
      resToggle.current = true;
      bacToggle.current = false;
    }

    //翻转回原位
    if (
      resToggle.current &&
      ((gamma >= 55 && gamma <= 90) || (gamma >= -90 && gamma <= -55))
    ) {
      getRandomWord();
      forToggle.current = true;
      resToggle.current = false;
      bacToggle.current = true;
      // navigator.vibrate(100);
    }

    // 向后翻转
    if (bacToggle.current && gamma >= -45 && gamma < 0) {
      navigator.vibrate(100); // 震动200毫秒
      onSkip(extractedWord.current);
      forToggle.current = false;
      resToggle.current = true;
      bacToggle.current = false;
    }

    // 处理角度0
    if (gamma === 0) {
      forToggle.current = false;
      resToggle.current = true;
      bacToggle.current = false;
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
    if (isEnd || isExtractedOver || isEarlyEnd) {
      // 播放gameover音效
      sounds.countDownEndSound.play();
      exitFullscreen();
      //将抽取过的词存入LocalStorage
      // 获取之前的数据
      const storedwords = localStorage.getItem("words");
      const parsedwords = storedwords !== null ? JSON.parse(storedwords) : [];
      // 新的数据
      const newData = {
        title: title,
        type: type,
        time: isEarlyEnd ? time - count : time,
        endTime: Date.now(),
        successWords: successWords.current,
        skipWords: skipWords.current,
      };
      // 追加新的数据
      const updatedwordss = [newData, ...parsedwords];
      // 保存到localStorage中
      localStorage.setItem("words", JSON.stringify(updatedwordss));
      router.push("/settlement");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnd, isEarlyEnd, isExtractedOver]);

  return (
    <div
      className={clsx(
        "h-full w-full flex flex-col justify-center p-4",
        bgColor
      )}
    >
      <p className="text-white text-6xl md:text-8xl text-center">{disText}</p>
      <ScoreBoard
        successNumber={successWords.current.length}
        skipNumber={skipWords.current.length}
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
