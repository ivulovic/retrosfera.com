import MiniChartCard from 'app/components/Charts/MiniChartCard';
import { useTranslation } from 'react-i18next';
import { renderDate, renderTimestampDate } from 'utils/project/date/covid';
import formatNumber from 'utils/project/number/formatNumber';
import { DailyDataItem } from '../../types';

export default function Sparklines({ data: { monthly, daily } }): JSX.Element {
  const { t } = useTranslation();
  if (!monthly.length || !daily.length) return <></>;

  const getTimestampFromDate = date => {
    const dateObj = new Date(date);
    const d = dateObj.getDate();
    const m = dateObj.getMonth();
    const y = dateObj.getFullYear();
    const ts = Date.UTC(y, m, d);
    return ts;
  };
  const monthlyTooltip = description =>
    function () {
      // @ts-ignore
      const xAxisValue = this.x;
      const { date } = monthly[xAxisValue - 1];
      const ts = getTimestampFromDate(date);
      // @ts-ignore
      const label = renderTimestampDate(ts, { showDay: false });
      // @ts-ignore
      return `<b>${label}</b> <br/>${description}: ${formatNumber(this.y)}`;
    };
  const dailyTooltip = description =>
    function () {
      // @ts-ignore
      const { date } = currentMonthDailyData[this.x - 1];
      return `<b>${renderDate(date)}</b> <br/>${description}: ${formatNumber(
        // @ts-ignore
        this.y,
      )}`;
    };
  const currentMonth = new Date().getMonth();
  const currentMonthDailyData: Array<DailyDataItem> = [];

  for (let i = daily.length - 1; i >= 0; i--) {
    const { date } = daily[i];
    const dateObj = new Date(date);
    if (dateObj.getMonth() < currentMonth) {
      break;
    }
    currentMonthDailyData.unshift(daily[i]);
  }
  const todayRecord =
    daily[daily.length - 1] ||
    daily[daily.length - 2] ||
    daily[daily.length - 3];
  return (
    <div>
      <div className="cards-container">
        <MiniChartCard
          title={t('sumTested')}
          chartData={monthly.map(({ sumTested }) => sumTested).join(', ')}
          seriesOptions={{
            color: '#3b4863',
          }}
          growth=""
          tooltipFormatter={monthlyTooltip(t('sumTested'))}
          value={todayRecord.sumTested}
        />

        <MiniChartCard
          title={t('sumRegistered')}
          seriesOptions={{
            color: '#6B6DEE',
          }}
          chartData={monthly.map(({ sumPositive }) => sumPositive).join(', ')}
          value={todayRecord.sumPositive}
          tooltipFormatter={monthlyTooltip(t('sumRegistered'))}
          growth={{
            value: todayRecord.percentOfInfectedSumComparedWithTestedSum + '%',
            text: ` ${t('percentOfTotalTested')}`,
          }}
        />

        <MiniChartCard
          title={t('sumRespirator')}
          chartData={monthly
            .map(({ onRespiratorForDate }) => onRespiratorForDate)
            .join(', ')}
          seriesOptions={{
            color: '#fd7e14',
          }}
          tooltipFormatter={monthlyTooltip(t('sumRespirator'))}
          value={todayRecord.onRespiratorForDate}
          growth={{
            value:
              todayRecord.percentOnRespiratorComparedWithHospitalizedForDate +
              '%',
            text: ` ${t('percentOfPositive')}`,
          }}
        />
      </div>
      <div className="cards-container">
        <MiniChartCard
          title={t('testedLast24h')}
          chartData={currentMonthDailyData
            .map(({ testedForDate }) => testedForDate)
            .join(', ')}
          growth=""
          seriesOptions={{
            color: '#00b8d4',
            // color: '#3b4863'
          }}
          tooltipFormatter={dailyTooltip(t('numOfTested'))}
          value={todayRecord.testedForDate}
        />

        <MiniChartCard
          title={t('registeredLast24h')}
          chartData={currentMonthDailyData
            .map(({ positiveForDate }) => positiveForDate)
            .join(', ')}
          seriesOptions={{
            color: '#10b759',
          }}
          tooltipFormatter={dailyTooltip(t('numOfRegistered'))}
          value={todayRecord.positiveForDate}
          growth={{
            value: todayRecord.percentOfInfectedComparedWithTestedForDate + '%',
            text: ` ${t('percentOfTested')}`,
          }}
        />

        <MiniChartCard
          title={t('hospitalizedLast24h')}
          chartData={currentMonthDailyData
            .map(({ hospitalizedForDate }) => hospitalizedForDate)
            .join(', ')}
          seriesOptions={{
            color: '#ffc107',
          }}
          tooltipFormatter={dailyTooltip(t('numOfDeaths'))}
          value={todayRecord.hospitalizedForDate}
          growth={{
            value:
              todayRecord.percentOfHospitalizedComparedWithInfectedSumForDate +
              '%',
            text: ` ${t('percentOfTotalPositive')}`,
          }}
        />

        <MiniChartCard
          title={t('deathsLast24h')}
          growth=""
          chartData={currentMonthDailyData
            .map(({ deathsForDate }) => deathsForDate)
            .join(', ')}
          seriesOptions={{
            color: '#dc3545',
          }}
          tooltipFormatter={dailyTooltip(t('numOfDeaths'))}
          value={todayRecord.deathsForDate}
        />
      </div>
    </div>
  );
}
