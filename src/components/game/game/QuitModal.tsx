"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Link,
} from "@heroui/react";

const QuitModal = ({ setIsEarlyEnd }: { setIsEarlyEnd: any }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button onPress={onOpen} isIconOnly variant="light">
        <div className="p-2 w-8 h-8 bg-gray-400 rounded-full shadow-lg opacity-30">
          <div className="icon-[octicon--x-16] text-white" />
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="sm"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader>
                确定要<span className="text-red-500">提前结束</span>游戏吗？
              </ModalHeader>
              <ModalFooter className="grid grid-cols-2">
                <Button onPress={onClose}>取消</Button>
                <Button
                  color="danger"
                  onPress={() => {
                    exitFullscreen();
                    setIsEarlyEnd(true);
                  }}
                >
                  确定
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default QuitModal;

//退出全屏
const exitFullscreen = () => {
  if (document.fullscreenElement) {
    // 检查当前是否处于全屏状态
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
