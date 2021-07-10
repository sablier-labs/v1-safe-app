import { useEffect, useState } from "react";

const useRefreshWithPeriod = (period: number): void => {
  const [, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), period);
    return () => {
      clearInterval(interval);
    };
  }, [period]);
};

export default useRefreshWithPeriod;
