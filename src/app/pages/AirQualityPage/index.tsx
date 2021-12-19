import Title from 'app/components/Title';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { AIR_QUALITY_SCOPE, getAirQualityStatus, metrics } from './constants';
import { reducer, actions } from './slice';
import { saga } from './saga';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectData, selectLoading } from './selectors';
import { useTranslation } from 'react-i18next';
import './style.scss';
import formatNumber from 'utils/project/number/formatNumber';
import Subtitle from 'app/components/Subtitle';
import LoadingIndicator from 'app/components/LoadingIndicator';
import { Helmet } from 'react-helmet-async';

export default function AirQualityPage(): JSX.Element {
  useInjectReducer({ key: AIR_QUALITY_SCOPE, reducer: reducer });
  useInjectSaga({ key: AIR_QUALITY_SCOPE, saga: saga });
  useEffect(() => {
    dispatch(actions.loadAirQualityInfo());
  }, []);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const [filter, setFilter] = useState('all');

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const data = useSelector(selectData);

  let dataArr =
    filter === 'all' ? [...data] : data.filter(x => x.station.city === filter);
  dataArr = [...dataArr.sort((a, z) => z.value - a.value)];

  const options = useMemo(() => {
    const arr: Array<string> = [];
    data.forEach(({ station: { city } }) => {
      if (!arr.includes(city)) {
        arr.push(city);
      }
    });
    return arr;
  }, [data]);

  return (
    <>
      <Helmet>
        <title>{t('airQualityTitle')}</title>
      </Helmet>
      <div className="page-wrapper air-quality-page">
        <Title>{t('airQualityTitle')}</Title>
        <Subtitle>{t('airQualityDescription')}</Subtitle>
        {isLoading && <LoadingIndicator />}
        {dataArr.length && !isLoading ? (
          <>
            <div className="filter">
              <select
                className="select"
                onChange={handleFilterChange}
                value={filter}
              >
                <option value="all">{t('allCities')}</option>
                {options.map(x => (
                  <option value={x}>{x}</option>
                ))}
              </select>
            </div>
            <table className="table">
              <thead>
                <th align="left">{t('city')}</th>
                <th align="left">{t('stationPlace')}</th>
                <th align="left">{t('status')}</th>
                <th align="right">{t('value')}</th>
              </thead>
              <tbody>
                {dataArr.map(x => {
                  return (
                    <tr key={x.station.id} className="table-row">
                      <td align="left">{x.station.city.toUpperCase()}</td>
                      <td align="left">{x.station.name}</td>
                      <td align="left">{t(getAirQualityStatus(x.value))}</td>
                      <td align="right">{formatNumber(x.value, false, 2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Subtitle>{t('metrics')}</Subtitle>
            <table className="table">
              <thead>
                <th align="left">{t('status')}</th>
                <th align="right">{t('value')}</th>
              </thead>
              <tbody>
                {metrics.map(([from, to], i) => {
                  const isLast = metrics.length - 1 === i;
                  return (
                    <tr key={i} className="table-row">
                      <td align="left">{t(getAirQualityStatus(from))}</td>
                      <td align="right">
                        {isLast && (
                          <>
                            {formatNumber(from, false, 2)} {t('moreThan')}
                          </>
                        )}
                        {!isLast && (
                          <>
                            {formatNumber(from, false, 2)}
                            {' - '}
                            {formatNumber(to, false, 2)}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <Subtitle>{t('noAirQualityData')}</Subtitle>
        )}
      </div>
    </>
  );
}
