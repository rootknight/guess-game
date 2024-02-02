import Bread from "@/components/admin/words/WordsBread";
import Search from "@/components/admin/Search";
import { fetchCategories } from "@/lib/fetchers/data";
import CategoryCard from "../../../../../components/admin/words/CategoryCard";
import CreateCategory from "../../../../../components/admin/words/CreateCategory";

export const metadata = {
  title: "词组管理",
};

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const resault = await fetchCategories(query);
  const categories = resault.data;

  return (
    <div className="flex flex-col gap-4">
      <Bread href="/admin/words" text="词组管理" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-2">
            <Search placeholder="查找词组..." />
          </div>
          <CreateCategory />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.title!}
              categoryType={category.type!}
              createdUser={category.createdUser!}
              wordCount={category.wordCount}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
