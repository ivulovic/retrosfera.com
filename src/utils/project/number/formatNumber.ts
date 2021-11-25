import formatWithCommas from './formatWithCommas';

export default function formatNumber(
  num: string | number,
  withSign = false,
  maxDecimals: number | undefined = undefined,
) {
  if (num !== 0 && !num) return '-';
  return formatWithCommas(num, {
    withSign,
    maxDecimals,
  });
}
