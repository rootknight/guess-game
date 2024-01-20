/* eslint-disable react-hooks/exhaustive-deps */
import { Progress } from "@nextui-org/progress";
import { useEffect, useState } from "react";
import clsx from "clsx";

function CountDown({
  time,
  isStartCountDown,
  onTimerEnd,
}: {
  time: number;
  isStartCountDown: boolean;
  onTimerEnd: any;
}) {
  const [remaingTime, setRemaingTime] = useState(time);

  // 只有当 isStartCountDown 为 true 时才开始倒计时
  useEffect(() => {
    if (isStartCountDown) {
      const interval = setInterval(() => {
        setRemaingTime((prevRemaingTime: number) => {
          if (prevRemaingTime > 0) {
            return prevRemaingTime - 1;
          } else {
            clearInterval(interval);
            onTimerEnd();
            return 0;
          }
        });
      }, 1000); // 每秒更新一次

      // 组件卸载时清除定时器
      return () => clearInterval(interval);
    }
  }, [isStartCountDown]);

  // 最后10秒倒计时
  useEffect(() => {
    if (remaingTime <= 10) {
      const countDownSound = new Audio("/countdown.mp3");
      countDownSound.play();
      navigator.vibrate(100); // 震动100毫秒
    }
  }, [remaingTime]);

  // 只有当 isStartCountDown 为 true 时才渲染组件
  if (!isStartCountDown) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <Progress
        isStriped
        aria-label="倒计时"
        // disableAnimation
        color="default"
        value={remaingTime}
        maxValue={time}
        // className="w-full p-4"
        classNames={{
          indicator: "transition-all duration-1000 ease-linear",
        }}
      />
      <p className="text-white text-2xl md:text-3xl lg:text-4xl">
        {remaingTime === 0 ? "时间到啦!" : remaingTime}
      </p>
    </div>
  );
}

export default CountDown;
