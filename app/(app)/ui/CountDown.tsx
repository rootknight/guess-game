/* eslint-disable react-hooks/exhaustive-deps */
import { Progress } from "@nextui-org/progress";
import { useEffect } from "react";

function CountDown({
  time,
  count,
  isStartCountDown,
  isEnd,
}: {
  time: number;
  count: number;
  isStartCountDown: boolean;
  isEnd: any;
}) {
  useEffect(() => {
    if (count <= 10) {
      const countDownSound = new Audio("/countdown10sec.mp3");
      countDownSound.play();
      navigator.vibrate(100); // 震动100毫秒
    }
  }, [count]);

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
