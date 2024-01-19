/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import SelectTime from "@/app/ui/SelectTime";
import Header from "@/app/ui/Header";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [latestSelectedWords, setLatestSelectedWords] = useState<any>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  interface SelectedWords {
    successWords: any[];
    skipWords: any[];
    time: number;
    title: string;
    type: string;
  }

  useEffect(() => {
    // 获取数据
    const storedSelectedWords = localStorage.getItem("selectedWords");
    // 如果 localStorage 中没有 selectedWords 数据，则跳转到指定页面
    if (storedSelectedWords === null) {
      router.push("/");
    }

    const parsedSelectedWords: SelectedWords[] =
      storedSelectedWords !== null ? JSON.parse(storedSelectedWords) : [];
    // 获取最新一条记录
    setLatestSelectedWords(parsedSelectedWords[0]);
  }, []); // 空数组表示只在组件挂载时运行

  const { successWords, skipWords, time, title, type } =
    latestSelectedWords || {};

  return (
    <div className="w-sreen h-screen p-4 flex flex-col gap-2">
      <Header title="游戏结束" />
      <section className="flex flex-row justify-around">
        <p>词组：{title}</p>
        <p>游戏时长：{time}s</p>
      </section>
      <section className="grid grid-cols-2 gap-2">
        <div className="text-green-500">
          <p className="py-4 bg-gray-700 rounded-t-xl text-center">
            正确：{successWords?.length || 0}
          </p>
          <div className="h-[55vh] flex flex-col overflow-y-auto rounded-b-xl bg-gray-500 p-2">
            {successWords?.map((item: any, index: any) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
        <div className="text-red-500">
          <p className="py-4 bg-gray-700 rounded-t-xl text-center">
            跳过：{skipWords?.length || 0}
          </p>
          <div className="h-[55vh] flex flex-col overflow-y-auto p-2 rounded-b-xl bg-gray-500">
            {skipWords?.map((item: any, index: any) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      </section>
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
  );
}

export default Page;
