"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { AiOutlinePlus } from "react-icons/ai";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { useFormState } from "react-dom";
import { createCategory } from "@/app/lib/createCategory";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreateCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState: {
    code: number;
    msg: string;
  } | null = null;
  const userId = "b0edb5f4-df84-46bc-9503-de9d1974b8e9";
  const [state, dispatch] = useFormState(createCategory, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state?.code === 200) {
      onClose();
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div>
      <Button color="primary" endContent={<AiOutlinePlus />} onPress={onOpen}>
        添加词组
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
        <form action={dispatch}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">添加词组</ModalHeader>
            <ModalBody>
              <input type="hidden" name="userId" value={userId} />
              <Input
                type="text"
                aria-label="title"
                name="title"
                label="名称"
                isRequired
                autoFocus
                isInvalid={state?.data?.titleErrors !== undefined}
                errorMessage={state?.data?.titleErrors}
              />
              <Input
                type="text"
                aria-label="type"
                name="type"
                label="简写(字母)"
                isRequired
                isInvalid={
                  state?.data?.typeErrors !== undefined ||
                  state?.data?.typeIsExist !== undefined
                }
                errorMessage={
                  state?.data?.typeErrors || state?.data?.typeIsExist
                }
              />
              <Textarea
                name="description"
                label="描述"
                placeholder="输入描述..."
                isRequired
                isInvalid={state?.data?.descriptionErrors !== undefined}
                errorMessage={state?.data?.descriptionErrors}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                取消
              </Button>
              <Button type="submit" color="primary">
                保存
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default CreateCategory;
