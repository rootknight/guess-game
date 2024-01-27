"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
} from "@nextui-org/react";

const columns = [
  {
    key: "word",
    label: "单词",
  },
  {
    key: "title",
    label: "分类",
  },
  {
    key: "createdAt",
    label: "创建时间",
  },
  {
    key: "updatedAt",
    label: "更新时间",
  },
  {
    key: "action",
    label: "操作",
  },
];

export default function TableWords({
  data,
  currentPage,
  totalPages,
}: {
  data: any[];
  currentPage: number;
  totalPages: number;
}) {
  const wordsCount = data.length;

  return (
    <Table
      aria-label="Example table with dynamic content"
      bottomContent={
        <div className="flex w-full justify-between items-center">
          <span className="text-small text-default-400">
            总共 {wordsCount} 条
          </span>
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={currentPage}
            total={totalPages}
          />
          <label className="flex items-center text-default-400 text-small">
            每页:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={(e) => console.log(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
