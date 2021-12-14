import { useContext } from 'react';
import Title from 'app/components/Title';
import { DataContext } from '../DataProvider/DataContext';
import CasesByMonth from './CasesByMonth';
import CasesOvertime from './CasesOvertime';
import DailyCases from './DailyCases';
import Sparklines from './Sparklines';
import { useTranslation } from 'react-i18next';
import { Covid19DataContext } from '../types';
import LoadingIndicator from 'app/components/LoadingIndicator';

export default function Content() {
  const { monthly, daily, isLoading } =
    useContext<Covid19DataContext>(DataContext);
  const { t } = useTranslation();
  if (isLoading) {
    return <LoadingIndicator />;
  }
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
