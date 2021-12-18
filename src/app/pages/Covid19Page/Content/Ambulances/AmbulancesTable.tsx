import ChevronDown from 'app/icons/ChevronDown';
import ChevronRight from 'app/icons/ChevronRight';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AmbulancesTable(props) {
  const { data } = props;
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState({});
  const [filter, setFilter] = useState('all');
  const toggleExpanded = id => {
    const obj = { ...expanded };
    if (obj[id]) {
      obj[id] = undefined;
    } else {
      obj[id] = true;
    }
    setExpanded(obj);
  };
  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const dataArr = filter === 'all' ? data : data.filter(x => x.city === filter);

  const options = useMemo(() => {
    const arr: Array<string> = [];
    data.forEach(({ city }) => {
      if (!arr.includes(city)) {
        arr.push(city);
      }
    });
    return arr;
  }, [data]);

  return (
    <div>
      <div className="filter">
        <select className="select" onChange={handleFilterChange} value={filter}>
          <option value="all">{t('allCities')}</option>
          {options.map(x => (
            <option value={x}>{x}</option>
          ))}
        </select>
      </div>
      <table className="table">
        <thead>
          <th>{t('city')}</th>
          <th>{t('name')}</th>
          <th>{t('streetName')}</th>
        </thead>
        <tbody>
          {dataArr.map(x => {
            const [workingDays, weekend] = x.memo.split('\n');
            const [_, workDaysWorkTime] = workingDays.split(':');
            const [__, weekendWorkTime] = workingDays.split(':');
            return (
              <>
                <tr
                  className="table-row"
                  key={x.id}
                  onClick={() => toggleExpanded(x.id)}
                >
                  <td>
                    <span>
                      {expanded[x.id] ? (
                        <ChevronDown width={16} height={16} />
                      ) : (
                        <ChevronRight width={16} height={16} />
                      )}
                    </span>{' '}
                    {x.city}
                  </td>
                  <td>{x.name}</td>
                  <td>
                    {x.street} {x.homeNo}
                  </td>
                </tr>
                {expanded[x.id] ? (
                  <tr className="subrow-container">
                    <td className="subrow" colSpan={3}>
                      <p>
                        <span>{t('weekdayWorkHours')}:</span>
                        <span>
                          {workDaysWorkTime}
                          {t('hourShort')}
                        </span>
                      </p>
                      <p>
                        <span>{t('weekendWorkHours')}:</span>
                        <span>
                          {weekendWorkTime}
                          {t('hourShort')}
                        </span>
                      </p>
                      {x.phone1 ? (
                        <p>
                          <span>{t('phone')}:</span>
                          <a href={`tel:${x.phone1}`}>{x.phone1}</a>
                        </p>
                      ) : null}
                      {x.phone2 ? (
                        <p>
                          <span>{t('phone')}:</span>
                          <a href={`tel:${x.phone2}`}>{x.phone2}</a>
                        </p>
                      ) : null}
                      <p>
                        <span>{t('map')}:</span>
                        <a
                          target="_blank"
                          href={`https://maps.google.com/?q=${x.latitude},${x.longitude}`}
                          rel="noreferrer"
                        >
                          {t('viewInMapApp')}
                        </a>
                      </p>
                    </td>
                  </tr>
                ) : null}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
