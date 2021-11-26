import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import formatNumber from 'utils/project/number/formatNumber';

export default function SharesTable({ rows }) {
  const { url } = useRouteMatch();
  const { t } = useTranslation();
  return (
    <table className="table">
      <thead>
        <th align="left">{t('cryptocurrencyPair')}</th>
        <th align="right">{t('shares')}</th>
        <th align="right">{t('currentPrice')}</th>
        <th align="right">{t('totalValue')}</th>
      </thead>
      <tbody>
        {rows.map((x: any) => {
          const share = Number(localStorage.getItem(`shares_${x.symbol}`)) || 0;
          return (
            <tr className="table-row" key={x.symbol}>
              <td align="left">
                <Link to={`${url}/${x.symbol}`}>{x.displayName}</Link>
              </td>
              <td align="right">{formatNumber(Number(share), false)}</td>
              <td align="right">{formatNumber(x.last, false, 4)}</td>
              <td align="right">{formatNumber(x.last * share, false, 4)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
