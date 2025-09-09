import { useEffect, useState } from "react";

export function useOverdueTime(endDate, status) {
  const [overdue, setOverdue] = useState(null);

  useEffect(() => {
    if (status !== "on_rent") return;

    const calculateOverdue = () => {
      const end = new Date(endDate);
      const now = new Date();
      if (now <= end) {
        setOverdue(null);
        return;
      }

      const diffMs = now - end;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      setOverdue(`${diffHours}h ${diffMinutes}m late`);
    };

    calculateOverdue();
    const interval = setInterval(calculateOverdue, 60 * 1000); // update tiap 1 menit

    return () => clearInterval(interval);
  }, [endDate, status]);

  return overdue;
}
