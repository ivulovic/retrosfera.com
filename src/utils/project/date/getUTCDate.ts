import addLeadingZero from './addLeadingZero';

export default function getUTCDate(date = new Date()): string {
  const d = date;
  const day = addLeadingZero(d.getUTCDate());
  const month = addLeadingZero(d.getUTCMonth() + 1);
  const year = d.getUTCFullYear();
  return `${day}.${month}.${year}`;
}
