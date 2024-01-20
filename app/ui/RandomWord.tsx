/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

const RandomWord = ({
  words,
  onStartCountDown,
  onSuccessWords,
  onSkipWords,
  onEmptyWords,
}: {
  words: any[];
  onStartCountDown: any;
  onSuccessWords: any;
  onSkipWords: any;
  onEmptyWords: any;
}) => {
  const [selectedWord, setSelectedWord] = useState<any>("");
  const [selectedWords, setSelectedWords] = useState<any[]>([]);
  const [successWords, setSuccessWords] = useState<any[]>([]);
  const [skipWords, setSkipWords] = useState<any[]>([]);
  const [backgroundColor, setBackgroundColor] = useState("bg-blue-500");
  const [displayedText, setDisplayedText] = useState<any>("");
  const [is3secEnd, setIs3secEnd] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // 初始化手机翻转动作触发标志
  const [isForwardTriggered, setIsForwardTriggered] = useState(false);
  const [isResetTriggered, setIsResetTriggered] = useState(true);
  const [isBackwardTriggered, setIsBackwardTriggered] = useState(false);

  // 判断横屏后才开启倒计时
  useEffect(() => {
    if (!isReady && window.innerWidth >= 640) {
      setIsReady(true);
      countDown3Sec();
    }

    if (!isReady && window.innerWidth < 640) {
      setBackgroundColor("bg-amber-500");
      setDisplayedText("屏幕朝向队友");
      setTimeout(() => {
        setIsReady(true);
        countDown3Sec();
      }, 3000);
    }
  }, [isReady]);

  // 获取过去1小时的记录以过滤后使用
  useEffect(() => {
    const storedSelectedWords = localStorage.getItem("selectedWords");
    const parsedSelectedWords =
      storedSelectedWords !== null ? JSON.parse(storedSelectedWords) : [];

    const currentTime = new Date().getTime();
    const oneHourInMillis = 60 * 60 * 1000; // 1小时的毫秒数

    // 过滤出过去1小时内的数据
    const filteredSelectedWords = parsedSelectedWords.filter((word: any) => {
      const wordTimestamp = new Date(word.timestamp).getTime();
      return currentTime - wordTimestamp <= oneHourInMillis;
    });
    // 更新状态
    setSelectedWords(() => filteredSelectedWords);
  }, []);

  //3秒倒计时
  const countDown3Sec = () => {
    let countDown3Sec = 3;
    const interval = setInterval(() => {
      if (countDown3Sec > 0) {
        const countDownSound = new Audio("/countdown.mp3");
        countDownSound.play();
        setDisplayedText(`准备: ${countDown3Sec}`);
        countDown3Sec--;
      } else {
        clearInterval(interval);
        const countDownEndSound = new Audio("/countdownend.mp3");
        countDownEndSound.play();
        navigator.vibrate(100); // 震动100毫秒
        setIs3secEnd(true);
        getRandomWord();
        onStartCountDown(true);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  };

  // 从剩余可选词组随机抽词
  const getRandomWord = () => {
    setBackgroundColor("bg-blue-500");
    const getRandomWordSound = new Audio("/getRandomWord.mp3");
    getRandomWordSound.play();
    const remainingWords = words.filter(
      (word) => !selectedWords.includes(word)
    );
    if (remainingWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingWords.length);
      setSelectedWord(remainingWords[randomIndex]);
      setDisplayedText(remainingWords[randomIndex]);
    } else {
      // 如果所有词都已选完，可以进行一些处理，例如重新洗牌词汇数组
      setDisplayedText("egg:所有词都抽完了😎");
      onEmptyWords();
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
    setSuccessWords((prevSuccessWords) => [...prevSuccessWords, word]);
    onSuccessWords((prevSuccessWords: any) => [...prevSuccessWords, word]);
  };

  const onSkip = (word: string) => {
    // 播放跳过音效
    const skipSound = new Audio("/skip.mp3");
    skipSound.play();
    //设置背景颜色为红色
    setDisplayedText("跳过");
    setBackgroundColor("bg-rose-500");
    setSkipWords((prevSkipWords) => [...prevSkipWords, word]);
    onSkipWords((prevSkipWords: any) => [...prevSkipWords, word]);
  };

  // 键盘动作
  const handleKeyPress = (event: any) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      onSuccess(selectedWord);
      reRandomWord();
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      onSkip(selectedWord);
      reRandomWord();
    }
  };

  //翻转手机动作
  const handleOrientation = (event: any) => {
    const gamma = Math.round(event.gamma);

    // 向前翻转
    if (!isForwardTriggered && gamma > 0 && gamma <= 45) {
      setIsForwardTriggered(true); // 设置触发标志
      setIsResetTriggered(false);
      setIsBackwardTriggered(true);
      navigator.vibrate(100); // 震动200毫秒
      onSuccess(selectedWord);
    }

    //翻转回原位
    if (
      !isResetTriggered &&
      ((gamma >= 55 && gamma <= 90) || (gamma >= -90 && gamma <= -55))
    ) {
      setIsForwardTriggered(false);
      setIsResetTriggered(true); // 设置触发标志
      setIsBackwardTriggered(false);
      // navigator.vibrate(100);
      getRandomWord();
    }

    // 向后翻转
    if (!isBackwardTriggered && gamma >= -45 && gamma < 0) {
      setIsForwardTriggered(true);
      setIsResetTriggered(false);
      setIsBackwardTriggered(true); // 设置触发标志
      navigator.vibrate(100); // 震动200毫秒
      onSkip(selectedWord);
    }

    // 向后翻转
    if (gamma === 0) {
      setIsForwardTriggered(true);
      setIsResetTriggered(false);
      setIsBackwardTriggered(true);
    }
  };

  // 节流包裹动作
  const throttledKeyPress = useThrottle(handleKeyPress, 1000);
  const throttledOrientation = useThrottle(handleOrientation, 10);

  // 添加键盘事件监听器
  useEffect(() => {
    if (is3secEnd) {
      document.body.addEventListener("keydown", throttledKeyPress);
    }

    // 在组件卸载时移除事件监听器，防止内存泄漏
    return () => {
      document.body.removeEventListener("keydown", throttledKeyPress);
    };
  }, [is3secEnd, throttledKeyPress]);

  // 添加螺旋仪事件监听器
  useEffect(() => {
    if (is3secEnd && isReady) {
      window.addEventListener("deviceorientation", throttledOrientation);
    }
    // 在组件卸载时移除事件监听器，防止内存泄漏
    return () => {
      window.removeEventListener("deviceorientation", throttledOrientation);
    };
  }, [is3secEnd, isReady, throttledOrientation]);

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
    </div>
  );
};

//基于时间的节流函数
function useThrottle(callback: any, delay: any) {
  const [lastTriggerTime, setLastTriggerTime] = useState(0);

  const throttledCallback = (...args: any[]) => {
    const currentTime = Date.now();

    if (currentTime - lastTriggerTime >= delay) {
      callback(...args);
      setLastTriggerTime(currentTime);
    }
  };

  return throttledCallback;
}

export default RandomWord;
