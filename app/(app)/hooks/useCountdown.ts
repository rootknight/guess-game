import { useEffect, useState, useMemo } from "react";

type UseCountdown = (num: number, isStart: boolean) => [number, boolean];
// 传入秒数,是否开始,返回当前计时和是否结束
const useCountdown: UseCountdown = (
  num: number = 10,
  isStart: boolean = false
) => {
  const second = Math.round(Math.abs(num));
  const [count, setCount] = useState<number>(second);
  // const isEnd = count === 0;
  const isEnd = useMemo(() => {
    return count === 0;
  }, [count]);

  useEffect(() => {
    if (isStart) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 0) {
            return prevCount - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000); // 每秒更新一次

      // 组件卸载时清除定时器
      return () => clearInterval(interval);
    }
  }, [isStart]);

  return [count, isEnd];
};

export default useCountdown;
