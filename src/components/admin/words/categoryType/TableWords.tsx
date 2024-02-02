"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import DeleteWord from "@/components/admin/words/categoryType/DeleteWord";
import UpdateWord from "./UpdateWord";

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
  const [page, setPage] = useState("1");
  const [pageSize, setPageSize] = useState("10");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    params.set("pageSize", pageSize);
    replace(`${pathname}?${params.toString()}`);
  }, [page, pathname, pageSize, replace, searchParams]);

  type Word = (typeof data)[0];

  const renderCell = useCallback((word: Word, columnKey: React.Key) => {
    const cellValue = word[columnKey as keyof Word];

    switch (columnKey) {
      case "word":
        return <p className="text-bold text-sm">{word.word}</p>;
      case "createdAt":
        return <p className="text-bold text-sm">{word.createdAt}</p>;
      case "updatedAt":
        return <p className="text-bold text-sm">{word.updatedAt}</p>;
      case "action":
        return (
          <div className="relative flex items-center gap-2">
            <UpdateWord wordId={word.id} word={word.word} />
            <DeleteWord wordId={word.id} word={word.word} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="当前分类的单词表"
      isHeaderSticky
      classNames={{ wrapper: "h-[calc(100dvh-20rem)]", th: "text-base" }}
      topContentPlacement="outside"
      bottomContentPlacement="outside"
      topContent={
        <div className="flex w-full justify-between items-center">
          <span className="text-small text-default-400">
            总共 {totalWords} 条
          </span>
          <label className="flex items-center text-default-400 text-small">
            每页:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              defaultValue={`${searchParams.get("pageSize") || 10}`}
              onChange={(e) => {
                setPageSize(e.target.value);
              }}
            >
              {[5, 10, 20, 50, 100].map((pageSize) => (
                <option key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </option>
              ))}
            </select>
            条
          </label>
        </div>
      }
      bottomContent={
        <div className="flex w-full justify-center items-center">
          <Pagination
            showControls
            showShadow
            color="secondary"
            page={currentPage}
            total={totalPages}
            onChange={(page) => {
              setPage(`${page}`);
            }}
          />
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
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
