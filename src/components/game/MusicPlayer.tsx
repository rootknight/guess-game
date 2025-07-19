/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect, useRef } from "react";
import { Switch } from "@heroui/react";

const MusicPlayer = () => {
  const [isAllowPlay, setIsAllowPlay] = useState<boolean>(false);

  const audioRef = useRef<any>(null);

  useEffect(() => {
    // 检查是否在浏览器环境下
    if (typeof window !== "undefined") {
      // 从localStorage获取上一次保存的音乐状态
      const storedMusicState = localStorage.getItem("musicState");
      setIsAllowPlay(storedMusicState ? storedMusicState === "true" : true);
    }
  }, []);

  useEffect(() => {
    // 检查是否在浏览器环境下
    if (typeof window !== "undefined") {
      // 创建音频对象
      audioRef.current = new Audio("/sinnesloschen-beam.mp3");

      // 重新加载音频
      audioRef.current.load();
      // 播放或停止音乐
      isAllowPlay ? audioRef.current.play() : audioRef.current.pause();
      // 将音乐状态存储在localStorage中
      localStorage.setItem("musicState", String(isAllowPlay));

      // 在组件卸载时清除音频对象
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    }
  }, [isAllowPlay, setIsAllowPlay]);

  return (
    <div>
      <Switch
        size="lg"
        color="success"
        // thumbIcon={({ isSelected, className }) =>
        //   isSelected ? <MusicOn /> : <MusicOn className={className} />
        // }
        // startContent={
        //   <Image src="/musicOn.webp" width={24} height={24} alt="开启音乐" />
        // }
        // endContent={
        //   <Image src="/musicOff.webp" width={24} height={24} alt="开启音乐" />
        // }
        isSelected={isAllowPlay}
        onValueChange={setIsAllowPlay}
      ></Switch>
    </div>
  );
};

export default MusicPlayer;
