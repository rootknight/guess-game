/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import SelectTime from "@/app/(app)/ui/SelectTime";
import Header from "@/app/(app)/ui/Header";
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
    <div className="w-sreen h-dvh p-4 flex flex-col gap-2 relative">
      {/* <Header title={`游戏结束`} /> */}
      <section className=" w-32 h-32 -translate-x-16 top-4 md:w-48 md:h-48 md:top-4 rounded-full border-dashed border-4 border-yellow-500 absolute left-1/2 md:-translate-x-24 bg-white shadow-lg flex flex-col justify-center items-center md:gap-2">
        <p className="text-3xl font-bold md:text-4xl text-orange-500">
          得分{successWords?.length || 0}
        </p>
        <p className=" text-sm text-gray-500 md:text-xl">{title}</p>
        <p className="text-sm text-gray-500 md:text-xl">{time}s</p>
      </section>
      <section className="h-full grid grid-cols-2 gap-2 mt-24 md:mt-28 text-xl">
        <div className="text-emerald-500 flex flex-col">
          <p className="py-4 bg-gray-700 rounded-t-xl text-center">
            正确：{successWords?.length || 0}
          </p>
          <div className=" h-[calc(100dvh-16rem)] flex flex-col items-center overflow-y-auto p-4 rounded-b-xl bg-gray-500">
            {successWords?.map((item: any, index: any) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
        <div className="text-amber-500 flex flex-col">
          <p className="py-4 bg-gray-700 rounded-t-xl text-center text-xl">
            跳过：{skipWords?.length || 0}
          </p>
          <div className="line-through h-[calc(100dvh-16rem)] flex flex-col items-center overflow-y-auto p-4 rounded-b-xl bg-gray-500">
            {skipWords?.map((item: any, index: any) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      </section>
      <footer className="grid grid-cols-2 gap-4 ">
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
