import LoadingIndicator from 'app/components/LoadingIndicator';
import Subtitle from 'app/components/Subtitle';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { DataContext } from '../../DataProvider/DataContext';
import { Covid19DataContext } from '../../types';
import CasesByMonth from '../CasesByMonth';
import CasesOvertime from '../CasesOvertime';
import DailyCases from '../DailyCases';
import Sparklines from '../Sparklines';

export default function Graphics() {
  const { t } = useTranslation();
  const { monthly, daily, isLoading } =
    useContext<Covid19DataContext>(DataContext);
  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <Helmet>
        <title>
          {t('covid19Title')} | {t('graphicView')}
        </title>
      </Helmet>
      <Subtitle>{t('graphicViewSubtitle')}</Subtitle>
      <Sparklines
        data={{
          monthly,
          daily,
        }}
      />
      <CasesOvertime data={monthly} />
      <CasesByMonth data={monthly} />
      <DailyCases data={daily} />
    </>
  );
}
