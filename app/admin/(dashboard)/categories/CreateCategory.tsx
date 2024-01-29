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
import { createCategory } from "../../lib/action";

const CreateCategory = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const initialState = { message: null, errors: {} };
  const userId = "b0edb5f4-df84-46bc-9503-de9d1974b8e9";
  const [state, dispatch] = useFormState(createCategory, initialState);

  return (
    <div>
      <Button color="primary" endContent={<AiOutlinePlus />} onPress={onOpen}>
        添加词组
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <form action={dispatch}>
              <ModalHeader className="flex flex-col gap-1">
                添加词组
              </ModalHeader>
              <ModalBody>
                <input type="hidden" name="userId" value={userId} />
                <Input
                  type="text"
                  aria-label="title"
                  name="title"
                  label="名称"
                  isRequired
                  autoFocus
                />
                <Input
                  type="text"
                  aria-label="type"
                  name="type"
                  label="简写(字母)"
                  isRequired
                />
                <Textarea
                  name="description"
                  label="描述"
                  placeholder="输入描述..."
                  isRequired
                />
                <p className=" text-red-500">{state.message}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button type="submit" color="primary">
                  保存
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateCategory;
