/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import SelectTime from "@/components/game/SelectTime";
import { Button, useDisclosure, Link } from "@heroui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [latestRecord, setLatestRecord] = useState<any>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    // 获取数据
    const storedWordsJSON = localStorage.getItem("words");
    // 如果 localStorage 中没有 selectedWords 数据，则跳转到指定页面
    if (storedWordsJSON === null) {
      router.push("/");
    }
    const storedWords = JSON.parse(storedWordsJSON || "[]");
    // 获取最新一条记录
    setLatestRecord(storedWords[0]);
  }, []); // 空数组表示只在组件挂载时运行

  const { successWords, skipWords, time, title, type } = latestRecord || {};

  return (
    <div className="w-full p-4 flex justify-center">
      <div className="w-full max-w-[1024px] flex flex-col gap-4 relative">
        <section
          className="
          w-32 h-32 
          absolute left-1/2 -translate-x-16 top-4
          md:w-48 md:h-48 md:top-4 md:-translate-x-24 md:gap-2
          rounded-full border-dashed border-4 border-yellow-500 bg-white shadow-lg
          flex flex-col justify-center items-center"
        >
          <p className="text-3xl font-bold md:text-4xl text-orange-500">
            得分{successWords?.length || 0}
          </p>
          <p className=" text-sm text-gray-500 md:text-xl">{title}</p>
          <p className="text-sm text-gray-500 md:text-xl">{time}s</p>
        </section>
        <section className="h-full grid grid-cols-2 gap-2 mt-20 md:mt-24 text-xl">
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
            <div className="h-[calc(100dvh-16rem)] flex flex-col items-center overflow-y-auto p-4 rounded-b-xl bg-gray-500">
              {skipWords?.map((item: any, index: any) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </section>
        <footer className="grid grid-cols-2 gap-2 ">
          <Button as={Link} href={"/"} color="default" size="lg">
            返回首页
          </Button>
          <Button onPress={onOpen} color="primary" size="lg">
            再玩一局
          </Button>
          <SelectTime
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={`再玩一局 ${title}`}
            type={type}
            desc={""}
          />
        </footer>
      </div>
    </div>
  );
}

export default Page;
