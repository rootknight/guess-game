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
import { Textarea } from "@nextui-org/input";
import { useFormState } from "react-dom";
import { createWord } from "@/lib/actions/createWord";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreateWord = ({
  categoryId,
  categoryTitle,
}: {
  categoryId: number;
  categoryTitle: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState: {
    code: number;
    msg: string;
  } | null = null;
  const userId = "b0edb5f4-df84-46bc-9503-de9d1974b8e9";
  const [state, dispatch] = useFormState(createWord, initialState);
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
      <Button
        color="primary"
        endContent={<div className="icon-[octicon--plus-16]" />}
        onPress={onOpen}
      >
        添加单词
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
        <form action={dispatch}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              向 {categoryTitle} 添加单词
            </ModalHeader>
            <ModalBody>
              <input type="hidden" name="categoryId" value={categoryId} />
              <Textarea
                name="words"
                label="只能包含数字中英文；多个请用逗号、空格、换行分隔"
                labelPlacement="outside"
                maxRows={24}
                placeholder="请输入..."
                isRequired
                isInvalid={state?.data?.errWords !== undefined}
                errorMessage={
                  state?.data?.errWords !== undefined &&
                  `错误单词：${state?.data?.errWords}`
                }
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

export default CreateWord;
