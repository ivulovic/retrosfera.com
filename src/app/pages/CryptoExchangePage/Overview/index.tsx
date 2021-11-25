import LoadingIndicator from 'app/components/LoadingIndicator';
import Subtitle from 'app/components/Subtitle';
import Title from 'app/components/Title';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import formatNumber from 'utils/project/number/formatNumber';
import RealTimeDataProviderContext from '../RealTimeDataProvider/context';
import './style.scss';

export default function OverviewPage() {
  const ctx = useContext(RealTimeDataProviderContext);
  const symbols = ctx?.symbols || [];
  const data = ctx?.data || [];
  const { t } = useTranslation();

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
            <Link to={url}>{t('cryptoexchangeTitle')}</Link>
          </h4>
          <Title>{t('overview')}</Title>
        </div>
        <div className="data">
          <Subtitle type="primary">{t('yourCryptocurrencyData')}</Subtitle>
          {rows.length ? (
            <table className="table" cellPadding="16px">
              <thead>
                <th align="left">{t('cryptocurrencyPair')}</th>
                <th align="right">{t('shares')}</th>
                <th align="right">{t('currentPrice')}</th>
                <th align="right">{t('totalValue')}</th>
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
                        {formatNumber(Number(share), false)}
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
            <Subtitle>{t('noCryptocurrencyShares')}</Subtitle>
          )}
        </div>
      </div>
    </div>
  );
}
