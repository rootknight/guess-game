/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useCallback } from "react";

const RandomWord = ({
  words,
  onSuccess,
  onError,
  isEventDisabled, // 接收 isEventDisabled 作为 prop
  setIsEventDisabled, // 接收 setIsEventDisabled 函数
}: {
  words: string[];
  onSuccess: any;
  onError: any;
  isEventDisabled: any;
  setIsEventDisabled: any;
}) => {
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [selectedWords, setSelectedWords] = useState<any[]>([]);

  useEffect(() => {
    // 仅保存和获取过去1小时的记录以过滤后使用
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

  useEffect(() => {
    // 组件初始加载时立即抽取一个随机词，但不放入任何数组
    selectRandomWord();
  }, []);

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
    }
  };

  // 使用 useCallback 以确保 handleKeyPress 在组件生命周期内保持一致的引用
  const handleKeyPress = useCallback(
    (event: any) => {
      if (!isEventDisabled) {
        setIsEventDisabled(true);
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          onSuccess(selectedWord);
          setTimeout(() => {
            selectRandomWord();
            setIsEventDisabled(false);
          }, 1000);
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          onError(selectedWord);
          setTimeout(() => {
            selectRandomWord();
            setIsEventDisabled(false);
          }, 1000);
        }
      }
    },
    [isEventDisabled, onSuccess, onError, selectedWord]
  );

  useEffect(() => {
    // 添加事件监听器
    document.addEventListener("keydown", handleKeyPress);

    // 在组件卸载时移除事件监听器，防止内存泄漏
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]); // 空数组表示只在组件挂载和卸载时运行

  return <p className="text-white text-8xl text-center">{selectedWord}</p>;
};

export default RandomWord;
