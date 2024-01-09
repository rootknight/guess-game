import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

const SelectTime = ({ isOpen, onOpenChange, title }) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="xl" hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {title}
              </ModalHeader>
              <ModalBody>
                <RadioGroup
                  defaultValue="60"
                  orientation="horizontal"
                  label="请选择游戏时长"
                >
                  <Radio value="60">60秒</Radio>
                  <Radio value="120">120秒</Radio>
                  <Radio value="180">180秒</Radio>
                  <Radio value="240">240秒</Radio>
                  <Radio value="300">300秒</Radio>
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  as={Link}
                  href="/game"
                  color="primary"
                  onPress={onClose}
                  className="w-full"
                >
                  开始游戏
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectTime;
