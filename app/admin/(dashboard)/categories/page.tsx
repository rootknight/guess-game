import Bread from "@/app/admin/(dashboard)/categories/Bread";

import Search from "@/app/admin/ui/Search";
import { fetchCategories } from "@/app/lib/data";
import CategoryCard from "./CategoryCard";
import CreateCategory from "./CreateCategory";

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
      <Bread href="/admin/categories" text="词组管理" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-2">
            <Search placeholder="查找词组..." />
          </div>
          <CreateCategory />
        </div>
        <div className="flex flex-row flex-wrap gap-2 w-full">
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
