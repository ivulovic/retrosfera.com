import { useRouteMatch, withRouter } from 'react-router';
import FinanceChipPercent from 'app/components/Finance/chip-percent';
import FinanceChipNumber from 'app/components/Finance/chip-number';
import getUTCDate from 'utils/project/date/getUTCDate';
import getUTCTime from 'utils/project/date/getUTCTime';
import formatPercentage from 'utils/project/number/formatPercentage';
import formatNumber from 'utils/project/number/formatNumber';
import { Link } from 'react-router-dom';

function SymbolBasicInfo(props: any): JSX.Element {
  const { item } = props;
  const {
    url,
    params: { symbol },
  } = useRouteMatch() as any;
  const { source, displayName, type, name, last, change, changePercent } = item;
  return (
    <div className="basic-info">
      <div className="header">
        <h4>
          <Link to={url.slice(0, -(symbol?.length + 1))}>Finance</Link> &middot;{' '}
          {displayName}
        </h4>
        <h1>{name}</h1>
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
