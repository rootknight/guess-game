import Bread from "@/app/admin/(dashboard)/categories/Bread";
import { Button } from "@nextui-org/button";
import { AiOutlinePlus } from "react-icons/ai";

import Search from "@/app/admin/(dashboard)/categories/Search";
import { fetchCategories } from "@/app/admin/lib/data";
import CategoryCard from "./CategoryCard";

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const categories = await fetchCategories(query);
  console.log(categories);

  return (
    <div className="flex flex-col gap-4">
      <Bread href="/admin/categories" text="词组管理" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-2">
            <Search />
          </div>
          <Button color="primary" endContent={<AiOutlinePlus />}>
            添加词组
          </Button>
        </div>
        <div className="flex flex-row flex-wrap gap-2 w-full">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              categoryType={category.type}
              createdUser={category.createdUser}
              wordCount={category.wordCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
