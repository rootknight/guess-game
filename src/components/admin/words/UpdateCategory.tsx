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
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { useFormState } from "react-dom";
import { updateCategory } from "@/lib/actions/updateCategory";
import { deleteCategory } from "@/lib/actions/deleteCategory";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UpdateCategory = ({
  id,
  title,
  categoryType,
  description,
}: {
  id: number;
  title: string;
  categoryType: string;
  description: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState: {
    code: number;
    msg: string;
  } | null = null;
  const userId = "b0edb5f4-df84-46bc-9503-de9d1974b8e9";
  const [state, dispatch] = useFormState(updateCategory, initialState);
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
      <Button onPress={onOpen} variant="light" className="w-full">
        编辑
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
        <ModalContent>
          <form action={dispatch}>
            <ModalHeader className="flex flex-col gap-1">编辑词组</ModalHeader>
            <ModalBody>
              <input type="hidden" name="userId" value={userId} />
              <input type="hidden" name="categoryId" value={id} />
              <Input
                type="text"
                aria-label="title"
                name="title"
                label="名称"
                isRequired
                autoFocus
                defaultValue={title}
                isInvalid={state?.data?.titleErrors !== undefined}
                errorMessage={state?.data?.titleErrors}
              />
              <Input
                type="text"
                aria-label="type"
                name="type"
                label="简写(字母)"
                isRequired
                defaultValue={categoryType}
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
                defaultValue={description}
                isInvalid={state?.data?.descriptionErrors !== undefined}
                errorMessage={state?.data?.descriptionErrors}
              />
              <Button
                color="danger"
                variant="light"
                onPress={async () => {
                  await deleteCategory(categoryType);
                  router.refresh();
                  onClose();
                }}
              >
                删除词组
              </Button>
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
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpdateCategory;
