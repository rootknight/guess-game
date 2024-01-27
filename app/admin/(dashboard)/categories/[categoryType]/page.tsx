import { Button } from "@nextui-org/button";
import { AiOutlinePlus } from "react-icons/ai";
import Search from "@/app/admin/(dashboard)/categories/Search";
import TableWords from "@/app/admin/(dashboard)/categories/[categoryType]/TableWords";
import { fetchFilteredWords, fetchWordsPages } from "@/app/admin/lib/data";
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
  const words: any[] = await fetchFilteredWords(
    query,
    category,
    currentPage,
    pageSize
  );
  console.log(words);

  const totalPages = await fetchWordsPages(query, pageSize);

  return (
    <div className="flex flex-col gap-4">
      <Bread href={`/admin/categories/${category}`} text={words[0].title} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-2">
            <Search />
          </div>
          <Button color="primary" endContent={<AiOutlinePlus />}>
            添加单词
          </Button>
        </div>
        <TableWords
          data={words}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Page;
