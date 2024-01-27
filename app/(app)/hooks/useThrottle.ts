import { useState } from "react";

//基于时间的节流[被节流函数,延迟]
export default function useThrottle(callback: any, delay: any) {
  const [lastTriggerTime, setLastTriggerTime] = useState(0);

  const throttledCallback = (...args: any[]) => {
    const currentTime = Date.now();

    if (currentTime - lastTriggerTime >= delay) {
      callback(...args);
      setLastTriggerTime(currentTime);
    }
  };

  return throttledCallback;
}
