import { Button } from "@nextui-org/button";
import TitleCard from "../ui/TitleCard";
import Link from "next/link";
import SelectTime from "@/app/ui/SelectTime";
import ActionButton from "@/app/ui/ActionButton";

function page() {
  return (
    <div className="bg-gradient-to-r from-[#FF9D6C] to-[#BB4E75]">
      <div className="container mx-auto flex flex-col gap-2 p-4 h-dvh">
        <TitleCard title={"游戏结束"}></TitleCard>
        <div className="flex flex-row justify-around p-4">
          <p>词组：成语</p>
          <p>游戏时长：180s</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-green-500">
            <p className="py-4 bg-gray-700 rounded-t-xl text-center">
              正确：20
            </p>
            <div className="h-[55vh] flex flex-col overflow-y-auto rounded-b-xl bg-gray-500 p-2">
              {Array.from({ length: 19 }).map((item, index) => (
                <p key={index}>卧虎藏龙</p>
              ))}
            </div>
          </div>
          <div className="text-red-500">
            <p className="py-4 bg-gray-700 rounded-t-xl text-center">
              错误：20
            </p>
            <div className="h-[55vh] flex flex-col overflow-y-auto p-2 rounded-b-xl bg-gray-500">
              <p>卧虎藏龙</p>
            </div>
          </div>
        </div>
        <footer className="grid grid-cols-2 gap-4">
          <ActionButton primary={"再玩一局"} secondary={"返回首页"} />
        </footer>
      </div>
    </div>
  );
}

export default page;
