import { createContext } from 'react';
import { Covid19DataContext } from '../types';

const initialContext = {
  daily: [],
  monthly: [],
};
export const DataContext = createContext<Covid19DataContext>(initialContext);
