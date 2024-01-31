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
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { deleteWord } from "@/app/lib/deleteWord";
import { useRouter } from "next/navigation";

const DeleteWord = ({ wordId, word }: { wordId: number; word: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userId = "b0edb5f4-df84-46bc-9503-de9d1974b8e9";

  const router = useRouter();

  return (
    <div>
      <Button onPress={onOpen} variant="light" className="w-full h-8">
        <MdDeleteOutline />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">删除单词</ModalHeader>
          <ModalBody>
            <input type="hidden" name="wordId" value={wordId} />
            <p>
              确定要删除 <strong className=" text-red-500">{word}</strong> 吗？
            </p>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" variant="light" onPress={onClose}>
              取消
            </Button>
            <Button
              color="danger"
              onPress={async () => {
                await deleteWord(wordId);
                onClose();
                router.refresh();
              }}
            >
              确定
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteWord;
