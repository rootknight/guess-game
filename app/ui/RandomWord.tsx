/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";

const RandomWord = ({
  words,
  onSuccess,
  onError,
  onEmptyWords,
}: {
  words: string[];
  onSuccess: any;
  onError: any;
  onEmptyWords: any;
}) => {
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [selectedWords, setSelectedWords] = useState<any[]>([]);
  const [lastAcceleration, setLastAcceleration] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

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

  // 仅保存和获取过去1小时的记录以过滤后使用
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

    // 存回localStorage
    localStorage.setItem(
      "selectedWords",
      JSON.stringify(filteredSelectedWords)
    );

    // 更新状态
    setSelectedWords(filteredSelectedWords);
  }, []);

  // 组件初始加载时立即抽取一个随机词，但不放入任何数组
  useEffect(() => {
    selectRandomWord();
  }, []);

  // 过滤已选词后抽词
  const selectRandomWord = () => {
    const remainingWords = words.filter(
      (word) => !selectedWords.includes(word)
    );
    if (remainingWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingWords.length);
      setSelectedWord(remainingWords[randomIndex]);
    } else {
      // 如果所有词都已选完，可以进行一些处理，例如重新洗牌词汇数组
      console.log("egg:所有词都抽完了😎");
      onEmptyWords();
    }
  };

  // 监听设备加速度
  const handleMotion = (event: any) => {
    const { acceleration } = event;

    // 获取垂直方向的加速度（这里使用 y 轴的加速度）
    const currentAcceleration = acceleration.y;

    // 判断向上甩动
    if (currentAcceleration < lastAcceleration.z) {
      // 在这里执行向上甩动的操作
      onSuccess(selectedWord);

      // 等待一段时间后再抽取下一个词
      setTimeout(() => {
        selectRandomWord();
      }, 1000);
    }
    // 判断向下甩动
    else if (currentAcceleration > lastAcceleration.z) {
      // 在这里执行向下甩动的操作
      onError(selectedWord);

      // 等待一段时间后再抽取下一个词
      setTimeout(() => {
        selectRandomWord();
      }, 1000);
    }

    // 更新上一次的加速度
    setLastAcceleration({
      x: acceleration.x,
      y: acceleration.y,
      z: currentAcceleration,
    });
  };

  // 按键动作
  const handleKeyPress = (event: any) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      onSuccess(selectedWord);
      setTimeout(() => {
        selectRandomWord();
      }, 1000);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      onError(selectedWord);
      setTimeout(() => {
        selectRandomWord();
      }, 1000);
    }
  };

  // 节流包裹动作
  const throttledKeyPress = useThrottle(handleKeyPress, 1000);

  // 添加事件监听器
  useEffect(() => {
    document.addEventListener("keydown", throttledKeyPress);
    // 添加设备加速度事件监听器
    window.addEventListener("devicemotion", handleMotion);

    // 在组件卸载时移除事件监听器，防止内存泄漏
    return () => {
      document.removeEventListener("keydown", throttledKeyPress);
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [throttledKeyPress]);

  return (
    <p className="text-white text-8xl text-center">
      {selectedWord}
      {lastAcceleration.z}
    </p>
  );
};

export default RandomWord;
