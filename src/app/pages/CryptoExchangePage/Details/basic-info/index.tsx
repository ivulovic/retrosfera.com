import { useRouteMatch, withRouter } from 'react-router';
import FinanceChipPercent from 'app/components/Finance/chip-percent';
import FinanceChipNumber from 'app/components/Finance/chip-number';
import getUTCDate from 'utils/project/date/getUTCDate';
import getUTCTime from 'utils/project/date/getUTCTime';
import formatPercentage from 'utils/project/number/formatPercentage';
import formatNumber from 'utils/project/number/formatNumber';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Title from 'app/components/Title';

function SymbolBasicInfo(props: any): JSX.Element {
  const { item } = props;
  const {
    url,
    params: { symbol },
  } = useRouteMatch() as any;
  const { source, displayName, type, name, last, change, changePercent } = item;
  const { t } = useTranslation();
  return (
    <div className="basic-info">
      <div className="header">
        <h4>
          <Link to={url.slice(0, -(symbol?.length + 1))}>
            {t('cryptoexchangeTitle')}
          </Link>{' '}
          &middot; {displayName}
        </h4>
        <Title>{name}</Title>
      </div>
      <div className="divider" />
      <div className="data">
        <div>
          <h1>{formatNumber(last, false, 2)}</h1>
          <FinanceChipPercent
            colorValue={change}
            value={changePercent}
            formatter={formatPercentage}
          />
          <FinanceChipNumber value={change} />
        </div>
        <div>
          {getUTCTime()} &middot; {getUTCDate()} &middot; UTC &middot; {source}
        </div>
      </div>
    </div>
  );
}

export default withRouter(SymbolBasicInfo);
