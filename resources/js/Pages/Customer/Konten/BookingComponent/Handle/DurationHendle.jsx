// Menghitung durasi antara dua Date
export function calculateDuration(startDate, endDate) {
  if (!startDate || !endDate) return null;

  const diffMs = endDate - startDate;
  if (diffMs <= 0) return "End must be after Start";

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

//   return `${days} hari ${String(hours).padStart(2, "0")} jam ${String(minutes).padStart(2, "0")} menit`;
return {
    text: `${days} H ${String(hours).padStart(2, "0")} J ${String(minutes).padStart(2, "0")} M`,
    totalHours: days * 24 + hours + minutes / 60,
    totalDays: totalSeconds / 86400
  };
}