import CategoryCard from "@/components/game/home/CategoryCard";
import data from "@/app/(game)/data/data.json";
import { getCategories } from "@/lib/fetchers/data";
import Header from "@/components/game/Header";
import { Button } from "@nextui-org/button";
import { GoHistory } from "react-icons/go";
import { Link } from "@nextui-org/link";

export default async function Page() {
  const { code, msg, data } = await getCategories("");
  const categories = data?.categories || [];

  return (
    <div className="w-full p-4 flex justify-center">
      <div className="w-full max-w-[1024px] flex flex-col gap-4">
        <Header title="你比我猜">
          <Button isIconOnly variant="shadow" as={Link} href="/records">
            <GoHistory size={24} color="white" />
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
