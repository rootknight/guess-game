import { Button } from "@nextui-org/button";
import CreateWord from "@/components/admin/words/categoryType/CreateWord";
import Search from "@/components/admin/Search";
import TableWords from "@/components/admin/words/categoryType/TableWords";
import { fetchFilteredWords, fetchCategories } from "@/lib/fetchers/data";
import Bread from "../../../../../../components/admin/words/categoryType/CategoryBread";

export const metadata = {
  title: "词组管理",
};

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
  const WordsResault = await fetchFilteredWords(
    query,
    category,
    currentPage,
    pageSize
  );
  const { words, resaultCount, resaultPages } = WordsResault.data;

  const CategoriesResault = await fetchCategories(category);
  const categories = CategoriesResault.data.categories || [];
  const currentCategory = categories[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <Bread
          href={`/admin/words/${category}`}
          text={currentCategory.title || ""}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-2">
            <Search placeholder="查找单词" />
          </div>
          <CreateWord
            categoryId={currentCategory.id}
            categoryTitle={currentCategory.title || ""}
          />
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
