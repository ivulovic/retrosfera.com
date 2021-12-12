import Subtitle from 'app/components/Subtitle';
import LineChartSection from '../../LineChartSection';

export default function CasesOvertime({ data: { monthly } }) {
  if (!monthly) return null;
  const confirmed = [];
  const deaths = [];
  const tested = [];
  const hospitalized = [];
  const onRespirator = [];
  monthly.forEach(
    ({
      sumPositive,
      sumDeaths,
      sumTested,
      sumHospitalized,
      onRespiratorForDate,
      date,
    }) => {
      const d = new Date(date);
      const ts = Date.UTC(d.getFullYear(), d.getMonth(), 1);

      confirmed.push([ts, sumPositive]);
      deaths.push([ts, sumDeaths]);
      tested.push([ts, sumTested]);
      hospitalized.push([ts, sumHospitalized]);
      onRespirator.push([ts, onRespiratorForDate]);
    },
  );
  return (
    <div>
      <Subtitle>Приказ промене стања током времена</Subtitle>
      <LineChartSection
        data={{
          confirmed,
          deaths,
          tested,
          hospitalized,
          onRespirator,
        }}
      />
    </div>
  );
}
