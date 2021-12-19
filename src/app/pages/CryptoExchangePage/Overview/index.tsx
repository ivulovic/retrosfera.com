import LoadingIndicator from 'app/components/LoadingIndicator';
import Subtitle from 'app/components/Subtitle';
import Title from 'app/components/Title';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import RealTimeDataProviderContext from '../RealTimeDataProvider/context';
import SharesTable from './SharesTable';
import SymbolsTable from './SymbolsTable';
import './style.scss';
import SettingsOutline from 'app/icons/SettingsOutline';
import { useSelector } from 'react-redux';
import { selectLoading } from '../selectors';
import { Helmet } from 'react-helmet-async';

export default function OverviewPage() {
  const isLoading = useSelector(selectLoading);
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

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Helmet>
        <title>{t('cryptoexchangeTitle')}</title>
      </Helmet>
      <div className="cryptoexchange-overview">
        <div className="page-info">
          <div className="header">
            <h4>
              <Link to={url}>{t('cryptoexchangeTitle')}</Link>
            </h4>
            <Title>{t('overview')}</Title>
          </div>
          <div className="data">
            <div className="space-between">
              <Subtitle type="primary">{t('cryptocurrencyData')}</Subtitle>
              <Link to={`${url}/configuration`}>
                <SettingsOutline />
              </Link>
            </div>
            {data.length ? (
              <SymbolsTable rows={data} />
            ) : (
              <Subtitle>
                {t('selectCryptocurrencies')}{' '}
                <Link to={`${url}/configuration`}>{t('configuration')}.</Link>{' '}
              </Subtitle>
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
    </>
  );
}
