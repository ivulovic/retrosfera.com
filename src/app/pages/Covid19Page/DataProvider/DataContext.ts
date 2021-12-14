import { createContext } from 'react';
import { Covid19DataContext } from '../types';

const initialContext = {
  daily: [],
  monthly: [],
  isLoading: false,
};
export const DataContext = createContext<Covid19DataContext>(initialContext);
