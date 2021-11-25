import { ReactNode } from 'react';

export interface IRealTimeDataProviderProps {
  children: ReactNode;
  symbolsList: Array<string>;
}

export interface IRealTimeDataProviderContext {
  data: Array<any>;
  // fids: Array<string>;
  symbols: Array<string>;
}

export interface ISetupConnectionDonePayload {
  i: number;
}
