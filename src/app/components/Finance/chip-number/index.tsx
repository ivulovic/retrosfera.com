import { memo } from 'react';
import formatNumber from 'utils/project/number/formatNumber';
import './style.scss';

function FinanceChipNumber(props: any) {
  const { value, formatter = formatNumber } = props;
  const changeClassName =
    value === 0 ? 'neutral' : value > 0 ? 'positive' : 'negative';
  return (
    <div className={`finance-chip-number ${changeClassName}`}>
      <div className="details">
        <div>
          <span className={changeClassName}>{formatter(value, true, 2)}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(FinanceChipNumber);
