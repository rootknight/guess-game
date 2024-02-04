"use client";

import Header from "@/components/game/Header";
import { Button, Link } from "@nextui-org/react";
import { GoX } from "react-icons/go";
import RecordTable from "@/components/game/records/RecordTable";

function Page() {
  return (
    <div className="w-full p-4 flex justify-center">
      <div className=" w-full max-w-[1024px] flex flex-col gap-4">
        <Header title="游戏记录">
          <Button isIconOnly variant="shadow" as={Link} href="/">
            <GoX size={24} color="white" />
          </Button>
        </Header>
        <RecordTable />
      </div>
    </div>
  );
}

export default Page;
