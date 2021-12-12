import { useContext } from 'react';
import Title from 'app/components/Title';
import { DataContext } from '../DataProvider/DataContext';
import CasesByMonth from './CasesByMonth';
import CasesOvertime from './CasesOvertime';
import DailyCases from './DailyCases';
import Sparklines from './Sparklines';

export default function Content() {
  const { monthly, daily, cards, initialDate } = useContext(DataContext);
  return (
    <div className="charts">
      <Title>Аналитика вируса корона у Републици Србији</Title>
      <Sparklines
        data={{
          monthly,
          daily,
          cards,
        }}
      />
      <CasesOvertime data={{ monthly }} />
      <CasesByMonth data={{ monthly }} />
      <DailyCases data={{ daily }} initialDate={initialDate} />
    </div>
  );
}
