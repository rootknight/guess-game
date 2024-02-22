import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import UpdateCategory from "@/components/admin/words/UpdateCategory";
import CardBgSvg from "@/components/CardBgSvg";

const CategoryCard = ({
  id,
  title,
  iconUrl,
  categoryType,
  createdUser,
  wordCount,
  description,
}: {
  id: number;
  title: string;
  iconUrl: string;
  categoryType: string;
  createdUser: string;
  wordCount: number;
  description: string;
}) => {
  return (
    <Card shadow="md" isBlurred className="w-full min-w-fit">
      <CardHeader className="flex gap-2 items-start">
        <CardBgSvg title={title} iconUrl={iconUrl} width={80} height={80} />
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

const SvgCard = ({ props }: { props?: any }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={68.75}
    height={88}
    fill="none"
    {...props}
  >
    <defs>
      <clipPath id="a">
        <rect width={68.75} height={88} rx={0} />
      </clipPath>
    </defs>
    <g clipPath="url(#a)">
      <path
        fill="#333"
        d="M62.7 0H6.05C2.75 0 0 2.475 0 5.638v76.724C0 85.525 2.75 88 6.05 88H62.7c3.3 0 6.05-2.475 6.05-5.638V5.638C68.75 2.475 66 0 62.7 0Z"
      />
      <path
        fill="#B70000"
        d="M60.913 2.75H7.837c-3.163 0-5.088 2.338-5.088 5.225V46.75L66 80.162V8.25c0-2.888-1.925-5.5-5.087-5.5Z"
      />
      <circle cx={24.75} cy={26.125} r={17.875} fill="#FFF" />
      <path
        fill="#333"
        d="M66.55 80.025H2.2V46.75c33 0 64.35 14.025 64.35 33.275Z"
      />
    </g>
  </svg>
);

export default CategoryCard;
