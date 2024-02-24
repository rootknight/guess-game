"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Image,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { useFormState } from "react-dom";
import { createCategory } from "@/lib/actions/createCategory";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState: {
    code: number;
    msg: string;
  } | null = null;
  const userId = "b0edb5f4-df84-46bc-9503-de9d1974b8e9";
  const [state, dispatch] = useFormState(createCategory, initialState);
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (state?.code === 200) {
      onClose();
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // 预览图片
  const previewImageHandler = (event: any) => {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // 将读取的文件以base64格式设置为previewImage
        setPreviewImage(reader.result as string);
      };
      // 读取文件并转换成base64
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div>
      <Button
        color="primary"
        endContent={<div className="icon-[octicon--plus-16]" />}
        onPress={onOpen}
      >
        添加词组
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
        <form action={dispatch}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">添加词组</ModalHeader>
            <ModalBody>
              <input type="hidden" name="userId" value={userId} />
              <input type="hidden" name="icon" value={previewImage} />
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
              <div className="flex flex-row gap-2 items-center">
                {previewImage && (
                  <Image src={previewImage} alt="icon" width={48} />
                )}
                <input
                  type="file"
                  aria-label="icon"
                  accept="/image/*"
                  onChange={previewImageHandler}
                  required
                />
              </div>
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
