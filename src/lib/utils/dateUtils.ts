// 替代 dayjs 的轻量级日期工具函数

export function formatDate(
  date: Date | string | number,
  format: string = "YYYY-MM-DD HH:mm:ss"
): string {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return format
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}

export function getTimestamp(date?: Date | string | number): number {
  return new Date(date || Date.now()).getTime();
}

export function isWithinHours(timestamp: number, hours: number): boolean {
  const now = Date.now();
  return now - timestamp < hours * 60 * 60 * 1000;
}
