"use client";

import { Button } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/use-disclosure";
import SelectTime from "@/components/game/SelectTime";

export default function CategoryCard({
  title,
  type,
  desc,
}: {
  title: string;
  type: string;
  desc: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button
        onPress={onOpen}
        className="h-unit-4xl w-full text-2xl bg-gradient-to-tl from-pink-500 to-yellow-500 text-white shadow-lg"
      >
        {title}
      </Button>
      <SelectTime
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={title}
        type={type}
        desc={desc}
      />
    </div>
  );
}
