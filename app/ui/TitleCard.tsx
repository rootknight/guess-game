import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

export default function TitleCard({ title }) {
  return (
    <Card
      className="w-full h-32 bg-background/60 dark:bg-default-100/50"
      isBlurred
      shadow="sm"
    >
      <CardBody className="flex justify-center">
        <h1 className="text-4xl text-center text-white">{title}</h1>
      </CardBody>
    </Card>
  );
}
