"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

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

const RecordTable = () => {
  const [records, setRecords] = useState();
  useEffect(() => {
    const storedWords = JSON.parse(localStorage.getItem("words") || "[]");

    setRecords(() => {
      return (
        storedWords.map(
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
            const gameTime = dayjs(endTime).format("YYYY-MM-DD HH:mm:ss");
            return { title, time, score, gameTime };
          }
        ) || []
      );
    });
  }, []);
  return (
    <Table
      aria-label="游戏记录"
      isStriped
      isHeaderSticky
      classNames={{ wrapper: "h-[calc(100dvh-8rem)]", th: "text-base" }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
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
  );
};

export default RecordTable;
