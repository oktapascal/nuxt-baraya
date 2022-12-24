/** @format */
export function getToday(date: Date) {
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 < 10 ? '0' : '') +
    (date.getMonth() + 1) +
    '-' +
    (date.getDate() < 10 ? '0' : '') +
    date.getDate()
  );
}

export function getTimeNow(date: Date) {
  return (
    (date.getHours() < 10 ? '0' : '') +
    date.getHours() +
    ':' +
    (date.getMinutes() < 10 ? '0' : '') +
    date.getMinutes() +
    ':' +
    (date.getSeconds() < 10 ? '0' : '') +
    date.getSeconds()
  );
}
