"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils/dateUtils";

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
  const [records, setRecords] = useState<any[]>([]);
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
            const gameTime = formatDate(endTime);
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
      classNames={{
        wrapper: "h-[calc(100dvh-8rem)]",
        th: "text-base",
        base: "max-h-[calc(100dvh-8rem)]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={records} emptyContent={"没有记录"}>
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
