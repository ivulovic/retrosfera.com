export interface CryptoexchangeState {
  availableSymbols: Array<string>;
  lastUpdate: number;
  loading: boolean;
  error: any;
}

export interface ConfigurationSymbolItem {
  id: string;
  checked: boolean;
}
