import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { asyncScheduler, buffer, filter, throttleTime } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import getSymbolDisplayName from 'utils/project/cryptoexchange/getSymbolDisplayName';
import getSymbolName from 'utils/project/cryptoexchange/getSymbolName';
import getSymbolType from 'utils/project/cryptoexchange/getSymbolType';

const keepInfoMessages = (item: any) =>
  !Array.isArray(item) &&
  'event' in item &&
  item.event === 'subscribed' &&
  item[1] !== 'hb';
const keepChanelValues = (item: any) => Array.isArray(item) && item[1] !== 'hb';
const TickerSnapshot = {
  BID: 0,
  BID_SIZE: 1,
  ASK: 2,
  ASK_SIZE: 3,
  DAILY_CHANGE: 4,
  DAILY_CHANGE_RELATIVE: 5,
  LAST_PRICE: 6,
  VOLUME: 7,
  HIGH: 8,
  LOW: 9,
};

function getTimestamp() {
  return new Date().getTime();
}

export default function useSymbolSubscription(symbolsList: Array<string>) {
  const state = useRef({});
  const { t } = useTranslation();
  const [d, setD] = useState(getTimestamp());

  const rerender = () => setD(getTimestamp());

  const subject = useMemo(
    () => webSocket('wss://api.bitfinex.com/ws/2/tickers'),
    [],
  );

  const collectMessages = buffer(
    subject.pipe(throttleTime(1000, asyncScheduler, { trailing: true })),
  );

  const initMessagesObservable = useMemo(
    () => subject.pipe(filter(keepInfoMessages), collectMessages),
    [d],
  );

  const valuesObservable = useMemo(
    () => subject.pipe(filter(keepChanelValues), collectMessages),
    [d],
  );

  const handleSymbolsInit = (messages: any): void => {
    if (messages.length) {
      const newState: Record<number, any> = {};
      messages.forEach((message: any) => {
        const { chanId, symbol, pair } = message;
        newState[chanId] = {
          chanId,
          symbol,
          pair,
          order: symbolsList.indexOf(symbol),
        };
      });
      state.current = newState;
    }
  };

  const handleMessage = (messages: any): void => {
    if (messages && messages.length) {
      const newState: Record<number, any> = state.current;
      messages.map((msg: Array<any>) => {
        const [chanId, values] = msg;
        const displayName = getSymbolDisplayName(newState[chanId].symbol);
        if (newState[chanId]) {
          newState[chanId] = {
            ...newState[chanId],
            displayName,
            source: 'Bitfinex',
            name: getSymbolName(displayName, t),
            type: getSymbolType(displayName),
            last: values[TickerSnapshot.LAST_PRICE],
            change: values[TickerSnapshot.DAILY_CHANGE],
            changePercent: values[TickerSnapshot.DAILY_CHANGE_RELATIVE],
          };
        }
      });
      state.current = { ...state.current, ...newState };
      rerender();
    }
  };

  useEffect(() => {
    const initMessagesObserver =
      initMessagesObservable.subscribe(handleSymbolsInit);
    const valuesObserver = valuesObservable.subscribe(handleMessage);
    return () => {
      initMessagesObserver.unsubscribe();
      valuesObserver.unsubscribe();
      subject.unsubscribe();
    };
  }, []);

  const makeTickerSymbolSubscription = (symbol: string) => ({
    event: 'subscribe',
    channel: 'ticker',
    symbol,
  });

  const makeSubscription = (symbol: any) =>
    subject.next(makeTickerSymbolSubscription(symbol));

  const subscribe = useCallback<any>(() => {
    symbolsList.forEach(makeSubscription);
  }, [symbolsList]);

  const unsubscribe = useCallback<any>(() => {
    const chanIds = Object.keys(state.current);
    chanIds.forEach(chanId => subject.next({ event: 'unsubscribe', chanId }));
    state.current = {};
  }, [symbolsList]);

  return [Object.values(state.current), subscribe, unsubscribe];
}
