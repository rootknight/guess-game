import { Progress } from "@nextui-org/progress";
import { useEffect, useState } from "react";

function CountDown({
  time,
  onTimerEnd,
}: {
  time: number;
  onTimerEnd: () => void;
}) {
  const [remaingTime, setRemaingTime] = useState(time);

  useEffect(() => {
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
  }, [onTimerEnd]);

  return (
    <>
      <Progress
        isStriped
        aria-label="倒计时"
        disableAnimation
        color="default"
        value={remaingTime}
        maxvalue={time}
        className="w-full p-4"
      />
      <p className="text-white text-3xl md:text-4xl">{remaingTime}</p>
    </>
  );
}

export default CountDown;
