"use client";

import Header from "@/components/game/Header";
import { Button, Link } from "@nextui-org/react";
import RecordTable from "@/components/game/records/RecordTable";

function Page() {
  return (
    <div className="w-full p-4 flex justify-center">
      <div className=" w-full max-w-[1024px] flex flex-col gap-4">
        <Header title="游戏记录">
          <Button isIconOnly variant="shadow" as={Link} href="/">
            <div className="icon-[octicon--x-16] text-white text-xl" />
          </Button>
        </Header>
        <RecordTable />
      </div>
    </div>
  );
}

export default Page;
