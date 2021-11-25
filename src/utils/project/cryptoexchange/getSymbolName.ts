export default function getSymbolName(str: string, translate) {
  if (str.includes('/')) {
    const [left, right] = str.split(' / ');
    return (
      translate(left.toLowerCase()) + ' - ' + translate(right.toLowerCase())
    );
  }
  return translate(str.toLowerCase());
}
