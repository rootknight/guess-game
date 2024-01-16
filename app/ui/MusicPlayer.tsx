/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect, useRef } from "react";
import { Switch } from "@nextui-org/switch";
import Image from "next/image";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const bgm = new Audio("/sinnesloschen-beam.mp3");
  const audioRef = useRef(bgm);

  useEffect(() => {
    // 从localStorage获取上一次保存的音乐状态
    const storedMusicState = localStorage.getItem("musicState");

    // 如果没有存储的音乐状态，则使用默认值 true（播放）
    setIsPlaying(storedMusicState ? storedMusicState === "true" : true);
  }, []);

  useEffect(() => {
    // 重新加载音频
    audioRef.current.load();
    // 播放或停止音乐
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
    // 将音乐状态存储在localStorage中
    localStorage.setItem("musicState", String(isPlaying));
  }, [isPlaying, setIsPlaying]);

  return (
    <div>
      <Switch
        size="lg"
        color="success"
        isSelected={isPlaying}
        onValueChange={setIsPlaying}
      >
        音乐
      </Switch>
    </div>
  );
};

export default MusicPlayer;
