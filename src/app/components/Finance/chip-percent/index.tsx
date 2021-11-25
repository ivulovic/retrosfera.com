import IconArrowDown from 'app/components/Icons/arrow-down';
import IconArrowNeutral from 'app/components/Icons/arrow-neutral';
import IconArrowUp from 'app/components/Icons/arrow-up';
import { memo } from 'react';
import formatPercentage from 'utils/project/number/formatPercentage';
import './style.scss';

function FinanceChipPercent(props: any) {
  const { value, colorValue } = props;
  const changeClassName =
    colorValue === 0 ? 'neutral' : colorValue > 0 ? 'positive' : 'negative';
  const Icon =
    changeClassName === 'neutral'
      ? IconArrowNeutral
      : changeClassName === 'positive'
      ? IconArrowUp
      : IconArrowDown;
  return (
    <div className={`finance-chip-percent ${changeClassName}`}>
      <div className={`arrow`}>
        <span className="icon">
          <Icon />
        </span>
      </div>
      <div className="details">
        <div>
          <span className={changeClassName}>{formatPercentage(value)}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(FinanceChipPercent);
