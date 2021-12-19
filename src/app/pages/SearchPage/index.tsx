import Title from 'app/components/Title';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import db from 'utils/project/search/db';
import getValueFromQuery from 'utils/project/search/getValueFromQuery';
import ResultRow from './ResultRow';
import './style.scss';

function SearchPage(props) {
  const { t } = useTranslation();
  const q = getValueFromQuery('q', props.location.search);
  const searchResult = db.find(x => x.title === q);
  return (
    <>
      <Helmet>
        <title>
          {t('searchResultsForTerm')}: {q}
        </title>
      </Helmet>
      <div className="page-wrapper search-page">
        <Title>
          {t('searchResultsForTerm')}: {q}
        </Title>
        <main className="main">{searchResult.results.map(ResultRow)}</main>
      </div>
    </>
  );
}

export default SearchPage;
