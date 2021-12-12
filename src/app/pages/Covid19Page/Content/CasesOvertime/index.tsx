import Subtitle from 'app/components/Subtitle';
import { useTranslation } from 'react-i18next';
import LineChartSection from '../../LineChartSection';
import { ChartDataItem, MonthlyDataProps } from '../../types';

export default function CasesOvertime(props: MonthlyDataProps): JSX.Element {
  const { t } = useTranslation();
  const { data } = props;
  if (!data) return <></>;
  const confirmed: Array<ChartDataItem> = [];
  const deaths: Array<ChartDataItem> = [];
  const tested: Array<ChartDataItem> = [];
  const hospitalized: Array<ChartDataItem> = [];
  const onRespirator: Array<ChartDataItem> = [];
  data.forEach(
    ({
      sumDeaths,
      sumTested,
      sumPositive,
      sumHospitalized,
      onRespiratorForDate,
      date,
    }) => {
      const d = new Date(date);
      const ts = Date.UTC(d.getFullYear(), d.getMonth(), 1);
      deaths.push([ts, sumDeaths]);
      tested.push([ts, sumTested]);
      confirmed.push([ts, sumPositive]);
      hospitalized.push([ts, sumHospitalized]);
      onRespirator.push([ts, onRespiratorForDate]);
    },
  );
  return (
    <div>
      <Subtitle>{t('statisticOvertime')}</Subtitle>
      <LineChartSection
        data={{
          deaths,
          tested,
          confirmed,
          hospitalized,
          onRespirator,
        }}
      />
    </div>
  );
}
