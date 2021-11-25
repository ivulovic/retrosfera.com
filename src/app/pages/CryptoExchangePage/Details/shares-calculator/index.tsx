import Subtitle from 'app/components/Subtitle';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import formatNumber from 'utils/project/number/formatNumber';

function getInitialState(item: any) {
  return {
    hasShare: localStorage.getItem(`hasShare_${item.symbol}`) || '0',
    shares: localStorage.getItem(`shares_${item.symbol}`) || 0,
  };
}

function SharesCalculator(props: any) {
  const { item } = props;
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const [state, setState] = useState(() => getInitialState(item));

  useEffect(() => {
    setState(getInitialState(item));
  }, [item.symbol]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'shares') {
      if (isNaN(value)) {
        return;
      }
    }
    const additionalState = { shares: state.shares };
    if (name === 'hasShare' && value === '0') {
      // reset in local storage
      localStorage.setItem(`shares_${item.symbol}`, '0');
      additionalState.shares = 0;
    }
    localStorage.setItem(`${name}_${item.symbol}`, value);
    setState({
      ...state,
      ...additionalState,
      [name]: value,
    });
  };
  const sharesExist = state.hasShare === '1';

  return (
    <div className="shares">
      {/* <h3>{t('shares')}</h3> */}

      <div className="form">
        <Subtitle type="primary">
          {t('cryptoCurrencySharesFormLabel')} {item.name}?
        </Subtitle>
        <div>
          <input
            onChange={handleChange}
            type="radio"
            id="sharesExistOption1"
            name="hasShare"
            value="1"
            checked={state.hasShare === '1'}
          />
          <label htmlFor="sharesExistOption1">{t('yes')}</label>
        </div>
        <div>
          <input
            onChange={handleChange}
            type="radio"
            id="sharesExistOption2"
            name="hasShare"
            value="0"
            checked={state.hasShare === '0'}
          />
          <label htmlFor="sharesExistOption2">{t('no')}</label>
        </div>
      </div>

      {sharesExist ? (
        <div>
          <br />
          <Subtitle type="primary">{t('shareAmountFormLabel')}</Subtitle>
          <div className="shares-number-row">
            <input
              type="text"
              name="shares"
              onChange={handleChange}
              value={state.shares}
            />
            <span className="sign-field">x</span>
            <span className="number-field">
              {formatNumber(item.last, false, 2)}
            </span>
            <span className="sign-field">=</span>
            <span className="number-field">
              {formatNumber(Number(state.shares || 0) * item.last, false, 2)}
            </span>
          </div>
          <br />
          <Subtitle>
            {t('sharesListLabel')}{' '}
            <Link to={url.slice(0, -(item.symbol?.length + 1))}>
              {t('overview')}.
            </Link>{' '}
          </Subtitle>
        </div>
      ) : null}
    </div>
  );
}

export default memo(SharesCalculator);
