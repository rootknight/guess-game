"use client";

import { Button } from "@nextui-org/button";
import SelectTime from "@/app/ui/SelectTime";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Link } from "@nextui-org/link";

const ActionButton = ({ primary, secondary }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} color="success">
        {primary}
      </Button>
      <SelectTime
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={"再玩一局"}
      />
      <Button as={Link} href={"/"} color="success">
        {secondary}
      </Button>
    </>
  );
};

export default ActionButton;
