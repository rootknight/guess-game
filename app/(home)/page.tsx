"use client";

import SelectWords from "@/app/ui/SelectWords";
import words from "@/app/data/words.json";
import Header from "@/app/ui/Header";
import { Button, ButtonGroup } from "@nextui-org/button";
import { GoHistory } from "react-icons/go";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Page() {
  return (
    <div className=" w-screen h-dvh p-4 flex flex-col it gap-4">
      <Header title="你比我猜">
        <Link href="/records">
          {/* <Button isIconOnly variant="shadow"> */}
          <GoHistory
            size={24}
            color="white"
            className="p-2 w-12 h-12 bg-gray-400 rounded-full shadow-lg"
          />
          {/* </Button> */}
        </Link>
      </Header>
      <div className="h-full grid grid-cols-2 gap-2 content-start overflow-y-auto">
        <SelectWords title={"随机"} type={"random"} />
        {words.map((item) => (
          <SelectWords key={item.type} type={item.type} title={item.title} />
        ))}
      </div>
    </div>
  );
}
