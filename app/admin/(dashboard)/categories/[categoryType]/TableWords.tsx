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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
const columns = [
  {
    key: "word",
    label: "单词",
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
  totalWords,
  totalPages,
}: {
  data: any[];
  currentPage: number;
  totalWords: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  return (
    <Table
      aria-label="Example table with dynamic content"
      bottomContent={
        <div className="flex w-full justify-between items-center">
          <span className="text-small text-default-400">
            总共 {totalWords} 条
          </span>
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={currentPage}
            total={totalPages}
            onChange={(page) => {
              replace(`${pathname}?page=${page}`);
            }}
          />
          <Select
            className="w-[80px]"
            label="每页条数"
            labelPlacement="outside-left"
            onChange={(e) => {
              replace(`${pathname}?pageSize=${e.target.value}`);
            }}
          >
            <SelectItem key={5} value="5">
              5
            </SelectItem>
            <SelectItem key={10} value="10">
              10
            </SelectItem>
            <SelectItem key={15} value="15">
              15
            </SelectItem>
          </Select>
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
