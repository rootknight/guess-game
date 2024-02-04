import CategoryCard from "@/components/game/home/CategoryCard";
import data from "@/app/(game)/data/data.json";
import { fetchCategories } from "@/lib/fetchers/data";
import Header from "@/components/game/Header";
import { Button } from "@nextui-org/button";
import { GoHistory } from "react-icons/go";
import { Link } from "@nextui-org/link";

export default async function Page() {
  const { code, msg, data } = await fetchCategories("");
  const categories = data?.categories || [];
  return (
    <div className="w-full p-4 flex justify-center">
      <div className="w-full max-w-[1024px] flex flex-col gap-4">
        <Header title="你比我猜">
          <Button isIconOnly variant="shadow" as={Link} href="/records">
            <GoHistory size={24} color="white" />
          </Button>
        </Header>
        <div className="h-[calc(100vh-8rem)] grid grid-cols-2 md:grid-cols-3 lg:grid-clos-4 gap-2 content-start overflow-y-auto">
          {categories.map((item) => (
            <CategoryCard key={item.id} type={item.type!} title={item.title!} />
          ))}
        </div>
      </div>
    </div>
  );
}
