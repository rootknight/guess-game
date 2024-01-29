import { Button } from "@nextui-org/button";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import Search from "@/app/admin/(dashboard)/categories/Search";
import TableWords from "@/app/admin/(dashboard)/categories/[categoryType]/TableWords";
import { fetchFilteredWords, fetchCategories } from "@/app/admin/db/data";
import Bread from "./Bread";

const Page = async ({
  params,
  searchParams,
}: {
  params: { categoryType: string };
  searchParams?: {
    query?: string;
    page?: string;
    pageSize?: number;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;
  const category = params.categoryType;
  const resault = await fetchFilteredWords(
    query,
    category,
    currentPage,
    pageSize
  );

  const { words, resaultCount, resaultPages } = resault.data;

  const response = await fetchCategories(category);
  const currentCategory = response.data[0].title;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <Bread href={`/admin/categories/${category}`} text={currentCategory!} />
        <Button color="default" isIconOnly variant="light" className="h-[24px]">
          <MdOutlineEdit />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-2">
            <Search placeholder="查找单词" />
          </div>
          <Button color="primary" endContent={<AiOutlinePlus />}>
            添加单词
          </Button>
        </div>
        <TableWords
          data={words!}
          currentPage={currentPage}
          totalWords={resaultCount || 0}
          totalPages={resaultPages || 0}
        />
      </div>
    </div>
  );
};

export default Page;
