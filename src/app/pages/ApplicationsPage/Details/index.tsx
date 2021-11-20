import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationDetailsParams } from '../types';

export default function ApplicationDetails(): JSX.Element {
  const { t } = useTranslation();
  const params = useParams<ApplicationDetailsParams>();
  const { applicationId } = params;
  return <div>
    {t('applications')} Details!!! for {applicationId}
    <br/>
    <br/>
    <br/>
    <Link to={'/applications'}>Back to applications</Link>
  </div>
}