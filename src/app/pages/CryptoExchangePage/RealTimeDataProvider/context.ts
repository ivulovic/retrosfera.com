import { createContext } from 'react';
import { IRealTimeDataProviderContext } from './types';

const RealTimeDataProviderContext =
  createContext<IRealTimeDataProviderContext | null>(null);

export default RealTimeDataProviderContext;
