"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Link,
} from "@nextui-org/react";
import Header from "@/components/game/Header";
import { GoX } from "react-icons/go";
import { useEffect, useState } from "react";

const columns = [
  {
    key: "title",
    label: "词组",
  },
  {
    key: "time",
    label: "用时",
  },
  {
    key: "score",
    label: "得分",
  },
  {
    key: "gameTime",
    label: "时间",
  },
];

function Page() {
  const [records, setRecords] = useState();
  useEffect(() => {
    const storedSelectedWords = JSON.parse(
      localStorage.getItem("selectedWords") || "[]"
    );

    setRecords(() => {
      return (
        storedSelectedWords.map(
          ({
            title,
            time,
            successWords,
            endTime,
          }: {
            title: string;
            time: number;
            successWords: string[];
            endTime: string;
          }) => {
            const score = successWords ? successWords.length : 0;
            // const gameTime = new Date(endTime).toLocaleString();
            const Time = new Date(endTime);
            const year = Time.getFullYear();
            const month = String(Time.getMonth() + 1).padStart(2, "0");
            const day = String(Time.getDate()).padStart(2, "0");
            const hours = String(Time.getHours()).padStart(2, "0");
            const minutes = String(Time.getMinutes()).padStart(2, "0");
            const seconds = String(Time.getSeconds()).padStart(2, "0");

            const formattedEndTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const gameTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            return { title, time, score, gameTime };
          }
        ) || []
      );
    });
  }, []);
  // 获取数据

  return (
    <div className=" w-screen h-dvh p-4 flex flex-col gap-4">
      <Header title="游戏记录">
        <Link href="/">
          <Button isIconOnly variant="shadow" as={Link} href="/">
            <GoX size={24} color="white" />
          </Button>
        </Link>
      </Header>
      <Table
        aria-label="游戏记录"
        isStriped
        isHeaderSticky
        classNames={{ wrapper: "h-[calc(100dvh-8rem)]", th: "text-base" }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={records || []} emptyContent={"没有记录"}>
          {(item: any) => (
            <TableRow key={item.gameTime}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Page;
