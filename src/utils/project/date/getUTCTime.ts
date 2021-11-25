import addLeadingZero from './addLeadingZero';

export default function getUTCTime(date = new Date()): string {
  const d = date;
  const hour = addLeadingZero(d.getUTCHours());
  const min = addLeadingZero(d.getUTCMinutes());
  return ` ${hour}:${min}`;
}
