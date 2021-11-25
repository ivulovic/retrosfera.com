import { IFinanceChipProps } from './types';
import './style.scss';
import { memo } from 'react';
import FinancePair from '../pair';
import { Link, useRouteMatch } from 'react-router-dom';
import IconArrowNeutral from 'app/components/Icons/arrow-neutral';
import IconArrowDown from 'app/components/Icons/arrow-down';
import formatPercentage from 'utils/project/number/formatPercentage';
import formatNumber from 'utils/project/number/formatNumber';
import IconArrowUp from 'app/components/Icons/arrow-up';

function FinanceChip(props: IFinanceChipProps) {
  const { data } = props;
  const { url } = useRouteMatch();
  const changeClassName =
    data.change === 0 ? 'neutral' : data.change > 0 ? 'positive' : 'negative';
  const Icon =
    changeClassName === 'neutral'
      ? IconArrowNeutral
      : changeClassName === 'positive'
      ? IconArrowUp
      : IconArrowDown;
  return (
    <Link to={`${url}/${data.symbol}`} className="finance-chip">
      <div className={`arrow ${changeClassName}`}>
        <span className="icon">
          <Icon />
        </span>
      </div>
      <div className="details">
        <div>
          <FinancePair pair={data.pair} />
          <span>{formatNumber(data.last, false, 2)}</span>
        </div>
        <div>
          <span className={changeClassName}>
            {formatPercentage(data.changePercent)}
          </span>
          <span className={changeClassName}>
            {formatNumber(data.change, false, 2)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default memo(FinanceChip);
