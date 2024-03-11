"use client";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/use-disclosure";
import SelectTime from "@/components/game/SelectTime";
import CardBgSvg from "@/components/CardBgSvg";

export default function CategoryCard({
  title,
  icon,
  type,
  desc,
}: {
  title: string;
  icon: string;
  type: string;
  desc: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="h-full w-full">
      <Card
        isPressable
        onPress={onOpen}
        className="bg-transparent rounded-[15px] w-full"
      >
        <CardBgSvg title={title} icon={icon} />
      </Card>
      <SelectTime
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={title}
        type={type}
        desc={desc}
      />
      {/* <CardBgSvg></CardBgSvg> */}
    </div>
  );
}
