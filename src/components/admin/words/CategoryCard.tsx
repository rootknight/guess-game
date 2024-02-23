"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Button,
  Switch,
} from "@nextui-org/react";
import UpdateCategory from "@/components/admin/words/UpdateCategory";
import CardBgSvg from "@/components/CardBgSvg";
import { enableCategory } from "@/lib/actions/enableCategory";
import { useRouter } from "next/navigation";

const CategoryCard = ({
  id,
  title,
  icon,
  isEnable,
  categoryType,
  createdUser,
  wordCount,
  description,
}: {
  id: number;
  title: string;
  icon: string;
  isEnable: boolean;
  categoryType: string;
  createdUser: string;
  wordCount: number;
  description: string;
}) => {
  const router = useRouter();
  return (
    <Card shadow="md" isBlurred>
      <CardHeader className="flex gap-2 items-start">
        <div className="w-16">
          <CardBgSvg title={title} icon={icon} />
        </div>
        <div className="flex flex-col">
          <p className="text-md">
            {title} {categoryType}
          </p>
          <p className="text-small text-default-500">创建者：{createdUser}</p>
          <p className="text-small text-default-500">包含词汇：{wordCount}</p>
          <Switch
            size="sm"
            defaultSelected={isEnable}
            onValueChange={(value) => {
              enableCategory(id, value);
              router.refresh();
            }}
          ></Switch>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible flex flex-col gap-2">
        <p className="text-small">{description}</p>
      </CardBody>
      <CardFooter className="grid grid-cols-2">
        <UpdateCategory
          id={id}
          title={title}
          icon={icon}
          categoryType={categoryType}
          description={description}
        />
        <Button
          as={Link}
          href={`/admin/words/${categoryType}`}
          variant="light"
          className="w-full"
        >
          查看
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
