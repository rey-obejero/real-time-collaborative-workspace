const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const NOW = new Date(2026, 6, 27);

export function formatDate(dateObj: Date): string {
  const day = dateObj.getDate();
  const mmm = MONTHS[dateObj.getMonth()];
  if (dateObj.getFullYear() === NOW.getFullYear()) return `${mmm} ${day}`;
  const dayStr = day < 10 ? "0" + day : day;
  return `${mmm} ${dayStr}, ${dateObj.getFullYear()}`;
}

export function formatRelativeTime(dateObj: Date): string {
  const diff = Math.floor((NOW.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return DAYS[dateObj.getDay()];
  return formatDate(dateObj);
}
