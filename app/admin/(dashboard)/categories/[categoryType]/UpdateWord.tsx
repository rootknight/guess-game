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
import { MdOutlineEdit } from "react-icons/md";
import { Textarea, Input } from "@nextui-org/input";
import { useFormState } from "react-dom";
import { updateWord } from "@/app/lib/updateWord";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UpdateWord = ({ wordId, word }: { wordId: number; word: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState: {
    code: number;
    msg: string;
  } | null = null;
  const userId = "b0edb5f4-df84-46bc-9503-de9d1974b8e9";
  const [state, dispatch] = useFormState(updateWord, initialState);
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
      <Button onPress={onOpen} variant="light" className="w-full h-8">
        <MdOutlineEdit />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
        <form action={dispatch}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">编辑单词</ModalHeader>
            <ModalBody>
              <input type="hidden" name="wordId" value={wordId} />
              <Input
                name="word"
                aria-label="编辑单词"
                labelPlacement="outside"
                placeholder="请输入..."
                isRequired
                autoFocus
                isInvalid={state?.data?.error !== undefined}
                errorMessage={
                  state?.data?.error !== undefined && state?.data?.error
                }
                defaultValue={word}
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

export default UpdateWord;
