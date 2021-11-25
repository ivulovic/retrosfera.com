const Currency: Record<string, string> = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
  xlm: 'Stellar',
  xrp: 'Ripple',
  doge: 'Dogecoin',
  usd: 'United States Dollar',
};
export default function getSymbolName(str: string) {
  if (str.includes('/')) {
    const [left, right] = str.split(' / ');
    return (
      Currency[left.toLowerCase()] + ' to the ' + Currency[right.toLowerCase()]
    );
  }
  return Currency[str] || 'Unknown';
}
