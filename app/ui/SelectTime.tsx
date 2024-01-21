"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useState } from "react";

const SelectTime = ({
  isOpen,
  onOpenChange,
  type,
  title,
}: {
  isOpen: boolean;
  onOpenChange: any;
  type: string;
  title: string;
}) => {
  const [radioValue, setRadioValue] = useState("60");

  const enterFullscreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  };

  const handleStartGame = () => {
    // 进入全屏
    enterFullscreen();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="xl"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                {title}
              </ModalHeader>
              <ModalBody>
                <RadioGroup
                  orientation="horizontal"
                  label="请选择游戏时长"
                  defaultValue="60"
                  onValueChange={setRadioValue}
                >
                  <Radio value="60">60秒</Radio>
                  <Radio value="120">120秒</Radio>
                  <Radio value="180">180秒</Radio>
                  <Radio value="240">240秒</Radio>
                  <Radio value="300">300秒</Radio>
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Link
                  href={{
                    pathname: "/game",
                    query: {
                      type: type,
                      time: radioValue,
                    },
                  }}
                >
                  <button onClick={handleStartGame} className=“p-2 bg-gray-300”>开始游戏</button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectTime;
