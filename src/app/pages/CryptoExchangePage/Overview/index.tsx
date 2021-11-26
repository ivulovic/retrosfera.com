import LoadingIndicator from 'app/components/LoadingIndicator';
import Subtitle from 'app/components/Subtitle';
import Title from 'app/components/Title';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import RealTimeDataProviderContext from '../RealTimeDataProvider/context';
import './style.scss';
import SharesTable from './SharesTable';
import SymbolsTable from './SymbolsTable';

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
          <Subtitle type="primary">{t('cryptocurrencyData')}</Subtitle>
          {data.length ? (
            <SymbolsTable rows={data} />
          ) : (
            <Subtitle>{t('noData')}</Subtitle>
          )}
        </div>
        <div className="data">
          <Subtitle type="primary">{t('yourCryptocurrencyData')}</Subtitle>
          {rows.length ? (
            <SharesTable rows={rows} />
          ) : (
            <Subtitle>{t('noCryptocurrencyShares')}</Subtitle>
          )}
        </div>
      </div>
    </div>
  );
}
