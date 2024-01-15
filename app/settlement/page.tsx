"use client";

import TitleCard from "../ui/TitleCard";
import Link from "next/link";
import SelectTime from "@/app/ui/SelectTime";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { useEffect, useState } from "react";

function Page() {
  // 使用 useState 设置默认值为 null，避免在没有数据时出现类型错误
  interface SelectedWords {
    successWords: any[];
    errorWords: any[];
    time: number;
    title: string;
    type: string;
  }
  const [latestSelectedWords, setLatestSelectedWords] =
    useState<SelectedWords | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    // 在 useEffect 中获取数据
    const storedSelectedWords = localStorage.getItem("selectedWords");
    const parsedSelectedWords: SelectedWords[] =
      storedSelectedWords !== null ? JSON.parse(storedSelectedWords) : [];
    // 将最新一条记录设置为 state
    setLatestSelectedWords(parsedSelectedWords[0]);
  }, []); // 空数组表示只在组件挂载时运行

  // 如果没有数据，可以显示加载中的 UI 或其他提示
  if (latestSelectedWords === null) {
    return <div>Loading...</div>;
  }

  const { successWords, errorWords, time, title, type } = latestSelectedWords;

  return (
    <div className="bg-gradient-to-r from-[#FF9D6C] to-[#BB4E75]">
      <div className="container mx-auto flex flex-col gap-2 p-4 h-dvh">
        <TitleCard title={"游戏结束"}></TitleCard>
        <div className="flex flex-row justify-around p-4">
          <p>词组：{title}</p>
          <p>游戏时长：{time}s</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-green-500">
            <p className="py-4 bg-gray-700 rounded-t-xl text-center">
              正确：{successWords.length}
            </p>
            <div className="h-[55vh] flex flex-col overflow-y-auto rounded-b-xl bg-gray-500 p-2">
              {successWords.map((item: any, index: any) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
          <div className="text-red-500">
            <p className="py-4 bg-gray-700 rounded-t-xl text-center">
              跳过：{errorWords.length}
            </p>
            <div className="h-[55vh] flex flex-col overflow-y-auto p-2 rounded-b-xl bg-gray-500">
              {errorWords.map((item: any, index: any) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>
        <footer className="grid grid-cols-2 gap-4">
          <Button onPress={onOpen} color="default">
            再玩一局
          </Button>
          <Button as={Link} href={"/"} color="default">
            返回首页
          </Button>
          <SelectTime
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={`再玩一局 ${title}`}
            type={type}
          />
        </footer>
      </div>
    </div>
  );
}

export default Page;
