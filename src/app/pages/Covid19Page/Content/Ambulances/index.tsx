import LoadingIndicator from 'app/components/LoadingIndicator';
import Subtitle from 'app/components/Subtitle';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { DataContext } from '../../DataProvider/DataContext';
import { Covid19DataContext } from '../../types';
import AmbulancesTable from './AmbulancesTable';

export default function Ambulances() {
  const { t } = useTranslation();
  const { ambulances, isLoading } = useContext<Covid19DataContext>(DataContext);

  if (isLoading) return <LoadingIndicator />;
  return (
    <>
      <Helmet>
        <title>
          {t('covid19Title')} | {t('ambulancesView')}
        </title>
      </Helmet>
      <div>
        <Subtitle>{t('ambulancesViewSubtitle')}</Subtitle>
        {ambulances.length ? (
          <AmbulancesTable data={ambulances} />
        ) : (
          <Subtitle>{t('noAmbulances')}</Subtitle>
        )}
      </div>
    </>
  );
}
