import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import formatNumber from 'utils/project/number/formatNumber';
import formatPercentage from 'utils/project/number/formatPercentage';

export default function SymbolsTable({ rows }) {
  const { url } = useRouteMatch();
  const { t } = useTranslation();
  return (
    <table className="table">
      <thead>
        <th align="left">{t('cryptocurrencyPair')}</th>
        <th align="right">{t('currentPrice')}</th>
        <th align="right">{t('change')}</th>
        <th align="right">{t('changePercent')}</th>
      </thead>
      <tbody>
        {rows.map((x: any) => {
          return (
            <tr className="table-row" key={x.symbol}>
              <td align="left">
                <Link to={`${url}/${x.symbol}`}>{x.displayName}</Link>
              </td>
              <td align="right">{formatNumber(Number(x.last), false, 8)}</td>
              <td align="right">{formatNumber(x.change, false, 8)}</td>
              <td align="right">{formatPercentage(x.changePercent)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
