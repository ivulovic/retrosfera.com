import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchByTitle } from './utils';
import getValueFromQuery from 'utils/project/search/getValueFromQuery';
import './style.scss';
import { useTranslation } from 'react-i18next';

function SearchInput({ focusOnInit = false, onSelect = (e): void => {} }) {
  const { search } = useLocation();
  const {
    i18n: { language },
  } = useTranslation();
  const searchRef = useRef() as any;
  const value = getValueFromQuery('q', search) || '';

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (focusOnInit) {
      searchRef.current?.focus();
    }
  }, []);

  const SearchResultRow = ({ className, to, children }) => (
    <button className={className} onClick={() => onSelect(to)}>
      {children}
    </button>
  );

  const handleSearch = value => {
    setSearchTerm(value);
  };
  const langShort = language.slice(0, 2);
  const searchResults = searchByTitle(searchTerm).filter(
    x => x.lang === langShort,
  );
  const hasResults = searchTerm.length > 0 && searchResults.length; // searchTerm && searchTerm.length > 2;
  return (
    <div className="main-search">
      <div className="content-search">
        <div className={`search-input ${hasResults ? 'has-results' : ''}`}>
          <input
            onKeyUp={e => {
              if (e.which === 13 && searchResults.length) {
                onSelect(searchResults[0].title);
              }
            }}
            defaultValue={value}
            ref={searchRef}
            onInput={({ target: { value } }: any) => handleSearch(value)}
            placeholder="Информације у секунди"
          />
          {/* <button>ИСТРАЖИ</button> */}
        </div>
      </div>
      <div className="search-results-wrapper">
        {hasResults ? (
          <div className="search-results">
            {searchResults.map(x => (
              <SearchResultRow className="search-result" to={x.title}>
                {x.title}
              </SearchResultRow>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchInput;
