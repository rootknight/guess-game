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
import { ZodError } from "zod";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreateCategory = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const initialState: {
    code: number;
    msg: string;
    err: ZodError | any;
  } | null = null;
  const userId = "b0edb5f4-df84-46bc-9503-de9d1974b8e9";
  const [state, dispatch] = useFormState(createCategory, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state?.code === 200) {
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
                  isInvalid={state?.err?.title?._errors}
                  errorMessage={state?.err?.title?._errors?.join(", ")}
                />
                <Input
                  type="text"
                  aria-label="type"
                  name="type"
                  label="简写(字母)"
                  isRequired
                  isInvalid={state?.err?.type?._errors || state?.code === 400}
                  errorMessage={
                    state?.code === 400
                      ? state?.msg
                      : state?.err?.type?._errors?.join(", ")
                  }
                />
                <Textarea
                  name="description"
                  label="描述"
                  placeholder="输入描述..."
                  isRequired
                  isInvalid={state?.err?.description?._errors}
                  errorMessage={state?.err?.description?._errors?.join(", ")}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button type="submit" color="primary" onPress={onClose}>
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
