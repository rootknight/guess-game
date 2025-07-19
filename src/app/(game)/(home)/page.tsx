import CategoryCard from "@/components/game/home/CategoryCard";
import { getCategories } from "@/lib/fetchers/data";
import Header from "@/components/game/Header";
import { Button, Link } from "@heroui/react";

export default async function Page() {
  const { code, msg, data } = await getCategories("");
  const categories = data?.categories || [];

  return (
    <div className="w-full p-4 flex justify-center">
      <div className="w-full max-w-[1024px] flex flex-col gap-4">
        <Header title="你比我猜">
          <Button isIconOnly variant="shadow" as={Link} href="/records">
            <div className="icon-[octicon--history-16] text-white text-xl" />
          </Button>
        </Header>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-clos-5 gap-2">
          {categories.map((item: any) => (
            <CategoryCard
              key={item.id}
              type={item.type!}
              title={item.title!}
              icon={item.icon!}
              desc={item.description!}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
