import { useContext } from 'react';
import Title from 'app/components/Title';
import { DataContext } from '../DataProvider/DataContext';
import CasesByMonth from './CasesByMonth';
import CasesOvertime from './CasesOvertime';
import DailyCases from './DailyCases';
import Sparklines from './Sparklines';
import { useTranslation } from 'react-i18next';
import { Covid19DataContext } from '../types';

export default function Content() {
  const { monthly, daily } = useContext<Covid19DataContext>(DataContext);
  console.log(monthly, daily);
  const { t } = useTranslation();
  return (
    <div className="charts">
      <Title>
        {t('coronaVirus')} {t('statisticForSerbia')}
      </Title>
      <Sparklines
        data={{
          monthly,
          daily,
        }}
      />
      <CasesOvertime data={monthly} />
      <CasesByMonth data={monthly} />
      <DailyCases data={daily} />
    </div>
  );
}
