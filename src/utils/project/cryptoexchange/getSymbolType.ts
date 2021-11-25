const SymbolType: Record<string, Array<string>> = {
  Cryptocurrency: ['btc', 'eth', 'xlm', 'xrp', 'doge'],
  Currency: ['usd'],
};
export default function getSymbolType(str: string) {
  // TODO: Implement
  return 'Cryptocurrency';
}
