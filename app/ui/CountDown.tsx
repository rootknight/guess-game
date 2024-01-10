import { Progress } from "@nextui-org/progress";
import { useEffect, useState } from "react";

function CountDown({ totalTime }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // 计算进度百分比
        const newProgress = prevProgress - 100 / totalTime;

        // 判断倒计时是否结束
        if (newProgress <= 0) {
          clearInterval(interval);
        }

        return newProgress;
      });
    }, 1000); // 每秒更新一次

    // 组件卸载时清除定时器
    return () => clearInterval(interval);
  }, [totalTime]);

  return (
    <Progress
      isStriped
      disableAnimation
      aria-label="倒计时"
      color="secondary"
      value={progress}
      className="w-full p-4"
    />
  );
}

export default CountDown;
