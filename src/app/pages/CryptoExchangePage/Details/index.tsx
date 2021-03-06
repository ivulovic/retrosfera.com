import LoadingIndicator from 'app/components/LoadingIndicator';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import RealTimeDataProviderContext from '../RealTimeDataProvider/context';

import SymbolBasicInfo from './basic-info';
import SharesCalculator from './shares-calculator';
import './style.scss';

function SymbolDetails(props: any): JSX.Element {
  const { t } = useTranslation();
  const { symbol } = props.match.params;

  const ctx = useContext(RealTimeDataProviderContext);
  const data = ctx ? ctx.data : [];

  const item = data.find((x: any) => x.symbol === symbol);

  if (!item)
    return (
      <div className="details">
        <LoadingIndicator />
      </div>
    );

  return (
    <>
      <Helmet>
        <title>
          {t('cryptoexchangeTitle')} {item?.displayName || ''}
        </title>
      </Helmet>
      <div className="cryptoexchange-details">
        <SymbolBasicInfo item={item} />
        <SharesCalculator item={item} />
      </div>
    </>
  );
}

export default withRouter(SymbolDetails);
