import LoadingIndicator from 'app/components/LoadingIndicator';
import FinanceChip from 'app/components/Finance/chip';
import { useContext } from 'react';
import RealTimeDataProviderContext from '../RealTimeDataProvider/context';
import './style.scss';
import Ticker from 'app/components/Finance/ticker';

export default function TickerList(props: any): JSX.Element {
  const ctx = useContext(RealTimeDataProviderContext);
  const data = ctx ? ctx.data : [];
  // const {symbolsList = []} = props;
  // const [state, subscribe, unsubscribe] = useSymbolSubscription(symbolsList);
  // const data = state.sort((a: any, z: any) => a.order - z.order);

  // useEffect(() => {
  //   if(symbolsList && symbolsList.length){
  //     subscribe();
  //   }
  //   return () => {
  //     unsubscribe();
  //   }
  // }, []);
  const isLoading = !data || (data && !data.length);

  if (isLoading) {
    return <></>;
  }
  return (
    <div className="ticker-container">
      <div className="ticker-wrapper">
        <Ticker
          data={data}
          renderer={(record: any) => (
            <FinanceChip key={record.symbol} data={record} />
          )}
        />
      </div>
    </div>
  );
  // return <div className={`chip-list ${isLoading ? 'loading' : ''}`}>
  //        {data.map((record: any)=> <FinanceChip key={record.symbol} data={record} />)}
  // </div>
}
