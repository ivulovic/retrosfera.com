import { useState, useEffect } from 'react';
import Subtitle from 'app/components/Subtitle';
import { months } from 'utils/project/date/covid';
import LineChartSection from '../../LineChartSection';
import { useTranslation } from 'react-i18next';
import { ChartDataItem, ChartDataProps } from '../../types';

export default function DailyCases(props): JSX.Element {
  const { t } = useTranslation();
  const { data: initialDailyData } = props;
  const [activeMonthDate, setActiveMonthDate] = useState<Date | string>(
    new Date(),
  );
  const [filteredData, setFilteredData] = useState<ChartDataProps>();

  useEffect(() => {
    if (activeMonthDate && initialDailyData) {
      updateDataForMonth(initialDailyData, activeMonthDate);
    }
  }, [initialDailyData, activeMonthDate]);

  const updateDataForMonth = (data, date) => {
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
    const deaths: Array<ChartDataItem> = [];
    const tested: Array<ChartDataItem> = [];
    const confirmed: Array<ChartDataItem> = [];
    const hospitalized: Array<ChartDataItem> = [];
    const onRespirator: Array<ChartDataItem> = [];
    data
      .filter(
        d =>
          new Date(d.date).getFullYear() === year &&
          new Date(d.date).getMonth() === month,
      )
      .forEach(
        ({
          date,
          positiveForDate,
          deathsForDate,
          testedForDate,
          hospitalizedForDate,
          onRespiratorForDate,
        }) => {
          const d = new Date(date);
          const y = d.getFullYear();
          const m = d.getMonth();
          const day = d.getDate();
          if (m !== month && y !== year) return;
          const ts = Date.UTC(y, m, day);
          confirmed.push([ts, positiveForDate]);
          deaths.push([ts, deathsForDate]);
          tested.push([ts, testedForDate]);
          hospitalized.push([ts, hospitalizedForDate]);
          onRespirator.push([ts, onRespiratorForDate]);
        },
      );
    setFilteredData({ confirmed, deaths, tested, hospitalized, onRespirator });
  };
  if (!initialDailyData.length) {
    return <></>;
  }
  const firstDate = initialDailyData[0].date;
  const newestDate = initialDailyData[initialDailyData.length - 1].date;
  const getDateString = d => {
    return new Date(d).toISOString().split('T')[0];
  };
  const decreaseDailyMonth = () => {
    const [y, m, d] = firstDate.split('-');
    const newDateTs = new Date(
      new Date(activeMonthDate).setMonth(
        new Date(activeMonthDate).getMonth() - 1,
      ),
    ).setDate(parseInt(d));
    if (newDateTs < new Date(firstDate).getTime()) {
      return;
    }
    const newDate = getDateString(newDateTs);
    setActiveMonthDate(newDate);
  };
  const increaseDailyMonth = () => {
    const [y, m, d] = newestDate.split('-');
    const newDateTs = new Date(
      new Date(activeMonthDate).setMonth(
        new Date(activeMonthDate).getMonth() + 1,
      ),
    ).setDate(parseInt(d));
    if (newDateTs > new Date().getTime()) {
      return;
    }
    const newDate = getDateString(newDateTs);
    setActiveMonthDate(newDate);
  };
  const dailyDateObj = new Date(activeMonthDate);
  return (
    <div>
      <Subtitle>
        {t('dailyStatisticForMonth')} {t(months[dailyDateObj.getMonth()])}{' '}
        {dailyDateObj.getFullYear()}
      </Subtitle>
      {filteredData && <LineChartSection data={filteredData} type="daily" />}
      <div className="chart-pagination">
        <button className="button" onClick={decreaseDailyMonth}>
          {t('lastMonth')}
        </button>
        <button className="button" onClick={increaseDailyMonth}>
          {t('nextMonth')}
        </button>
      </div>
    </div>
  );
}
