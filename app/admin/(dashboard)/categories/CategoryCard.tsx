import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

const CategoryCard = ({
  title,
  categoryType,
  createdUser,
  wordCount,
}: {
  title: string;
  categoryType: string;
  createdUser: string;
  wordCount: number;
}) => {
  return (
    <Card
      shadow="md"
      isBlurred
      isPressable
      className="max-w-[238px] min-w-fit w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
      as={Link}
      href={`/admin/categories/${categoryType}`}
    >
      <CardHeader className="flex gap-2 flex-row">
        <p className="text-7xl">🎴</p>
        <div className="flex flex-col items-start">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">创建者：{createdUser}</p>
          <p className="text-small text-default-500">包含词汇：{wordCount}</p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default CategoryCard;
