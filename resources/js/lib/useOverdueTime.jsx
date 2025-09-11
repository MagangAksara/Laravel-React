import { useEffect, useState } from "react";

export function useOverdueTime(endDate, status) {
  const [overdue, setOverdue] = useState(null);
  const [overdueHours, setOverdueHours] = useState(0);

  useEffect(() => {
    if (status !== "on_rent") return;

    const calculateOverdue = () => {
      const end = new Date(endDate);
      const now = new Date();

      if (now <= end) {
        setOverdue(null);
        setOverdueHours(0);
        return;
      }

      const diffMs = now - end;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      // UI string
      setOverdue(`${diffHours}h ${diffMinutes}m late`);
      // numeric (minimal 1 jam)
      setOverdueHours(diffHours > 0 ? diffHours : 1);
    };

    calculateOverdue();
    const interval = setInterval(calculateOverdue, 60 * 1000); // update tiap 1 menit

    return () => clearInterval(interval);
  }, [endDate, status]);

  return { overdue, overdueHours };
}
