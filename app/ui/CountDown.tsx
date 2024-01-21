/* eslint-disable react-hooks/exhaustive-deps */
import { Progress } from "@nextui-org/progress";
import { useEffect, useState } from "react";
import useCountdown from "@/app/hooks/useCountdown";

function CountDown({
  time,
  isStartCountDown,
  onTimerEnd,
}: {
  time: number;
  isStartCountDown: boolean;
  onTimerEnd: any;
}) {
  const [count, isEnd] = useCountdown(time, isStartCountDown);

  useEffect(() => {
    if (count <= 10) {
      const countDownSound = new Audio("/countdown.mp3");
      countDownSound.play();
      navigator.vibrate(100); // 震动100毫秒
    }
    if (isEnd) {
      onTimerEnd();
    }
  }, [count, isEnd]);

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
        value={count}
        maxValue={time}
        // className="w-full p-4"
        classNames={{
          indicator: "transition-all duration-1000 ease-linear",
        }}
      />
      <p className="text-white text-2xl md:text-3xl lg:text-4xl">
        {isEnd ? "时间到啦!" : count}
      </p>
    </div>
  );
}

export default CountDown;
