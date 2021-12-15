import { createContext } from 'react';
import { Covid19DataContext } from '../types';

const initialContext = {
  daily: [],
  monthly: [],
  ambulances: [],
  isLoading: false,
};
export const DataContext = createContext<Covid19DataContext>(initialContext);
