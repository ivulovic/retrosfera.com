import LoadingIndicator from 'app/components/LoadingIndicator';
import { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import formatNumber from 'utils/project/number/formatNumber';
import RealTimeDataProviderContext from '../RealTimeDataProvider/context';
import './style.scss';

export default function OverviewPage() {
  const ctx = useContext(RealTimeDataProviderContext);
  const symbols = ctx?.symbols || [];
  const data = ctx?.data || [];

  const getSymbolsWithShares = (): Array<string> => {
    let result: Array<string> = [];
    symbols.forEach((s: string) => {
      const shareFromStorage = localStorage.getItem(`shares_${s}`);
      if (Number(shareFromStorage)) {
        result.push(s);
      }
    });
    return result;
  };

  const sharesList = getSymbolsWithShares();
  const { url } = useRouteMatch();

  const rows = data.filter((x: any) => sharesList.includes(x.symbol));

  const isLoading = !data || (data && !data.length);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="cryptoexchange-overview">
      <div className="page-info">
        <div className="header">
          <h4>
            <Link to={url}>Finance</Link>
          </h4>
          <h1>Overview</h1>
        </div>
        <div className="divider" />
        <div className="data">
          {rows.length ? (
            <table className="table" cellPadding="16px">
              <thead>
                <th align="left">Symbol</th>
                <th align="right">Shares</th>
                <th align="right">Price</th>
                <th align="right">Total</th>
              </thead>
              <tbody>
                {rows.map((x: any) => {
                  const share =
                    Number(localStorage.getItem(`shares_${x.symbol}`)) || 0;
                  return (
                    <tr className="table-row">
                      <td align="left">
                        <Link to={`${url}/${x.symbol}`}>{x.displayName}</Link>
                      </td>
                      <td align="right">
                        {formatNumber(Number(share), false, 2)}
                      </td>
                      <td align="right">{formatNumber(x.last, false, 2)}</td>
                      <td align="right">
                        {formatNumber(x.last * share, false, 2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h5>No data</h5>
          )}
        </div>
      </div>
    </div>
  );
}
