export default function getSymbolDisplayName(symbol: string): string {
  if (!symbol) return '';
  const str = symbol.startsWith('t') ? symbol.slice(1) : symbol;
  let data: Array<string> = [];
  if (str.includes(':')) {
    data = str.split(':');
  } else {
    data = [str.slice(0, str.length - 3), str.slice(-3)];
  }
  return data.join(' / ');
}
