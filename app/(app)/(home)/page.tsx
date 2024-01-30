import SelectWords from "@/app/(app)/ui/SelectWords";
import data from "@/app/(app)/db/data.json";
import Header from "@/app/(app)/ui/Header";
import { Button } from "@nextui-org/button";
import { GoHistory } from "react-icons/go";
import { Link } from "@nextui-org/link";

export default function Page() {
  const words = data.words;
  return (
    <div className="w-screen h-dvh p-4 flex flex-col gap-4">
      <Header title="你比我猜">
        <Button isIconOnly variant="shadow" as={Link} href="/records">
          <GoHistory size={24} color="white" />
        </Button>
      </Header>
      <div className="h-full grid grid-cols-2 gap-2 content-start overflow-y-auto">
        <SelectWords title={"随机"} type={"random"} />
        {words.map((item) => (
          <SelectWords key={item.type} type={item.type} title={item.title} />
        ))}
      </div>
    </div>
  );
}
