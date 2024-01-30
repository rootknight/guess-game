import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import UpdateCategory from "@/app/admin/(dashboard)/categories/UpdateCategory";

const CategoryCard = ({
  id,
  title,
  categoryType,
  createdUser,
  wordCount,
  description,
}: {
  id: number;
  title: string;
  categoryType: string;
  createdUser: string;
  wordCount: number;
  description: string;
}) => {
  return (
    <Card
      shadow="md"
      isBlurred
      className="max-w-[238px] min-w-fit w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
    >
      <CardHeader className="flex gap-2 flex-row">
        <p className="text-7xl">🎴</p>
        <div className="flex flex-col items-start">
          <p className="text-md">{title}</p>
          <p className="text-md">{categoryType}</p>
          <p className="text-small text-default-500">创建者：{createdUser}</p>
          <p className="text-small text-default-500">包含词汇：{wordCount}</p>
        </div>
      </CardHeader>
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <CardFooter className="grid grid-cols-2">
        <UpdateCategory
          id={id}
          title={title}
          categoryType={categoryType}
          description={description}
        />
        <Button
          as={Link}
          href={`/admin/categories/${categoryType}`}
          variant="light"
          className="w-1/2"
        >
          查看
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
