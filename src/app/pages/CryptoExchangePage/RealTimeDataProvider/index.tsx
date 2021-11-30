import { useEffect } from 'react';
import RealTimeDataProviderContext from './context';
import { IRealTimeDataProviderProps } from './types';
import useSymbolSubscription from './useSymbolSubscription';

export default function RealTimeDataProvider(
  props: IRealTimeDataProviderProps,
) {
  const { children, symbolsList } = props;

  const [state, subscribe, unsubscribe] = useSymbolSubscription(symbolsList);
  const data = state.sort((a: any, z: any) => a.order - z.order);

  useEffect(() => {
    if (symbolsList && symbolsList.length) {
      subscribe();
    }
    return () => {
      unsubscribe();
    };
  }, [symbolsList]);

  return (
    <RealTimeDataProviderContext.Provider
      value={{
        data,
        symbols: symbolsList,
      }}
    >
      {children}
    </RealTimeDataProviderContext.Provider>
  );
}
