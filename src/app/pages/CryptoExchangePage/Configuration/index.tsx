import LoadingIndicator from 'app/components/LoadingIndicator';
import Subtitle from 'app/components/Subtitle';
import Title from 'app/components/Title';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAvailableSymbols, selectLoading } from '../selectors';
import { ConfigurationSymbolItem } from '../types';
import { SELECTED_ITEMS_KEY, SOURCE_LIMIT } from '../constants';
import { getLocalDbData, setLocalDbData } from 'utils/localdb';
import './style.scss';
import { actions } from '../slice';

export default function ConfigurationPage() {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const [state, setState] = useState<Array<ConfigurationSymbolItem>>([]);
  const isLoading = useSelector(selectLoading);
  const availableSymbols = useSelector(selectAvailableSymbols);

  useEffect(() => {
    async function asyncInit() {
      const items = await getLocalDbData(SELECTED_ITEMS_KEY);
      const symbols = availableSymbols.map(s => ({
        id: s,
        checked: items?.[s]?.checked || false,
      }));
      setState(symbols);
    }

    if (availableSymbols) {
      asyncInit();
    }

    return () => {
      dispatch(actions.configurationChanged());
    };
  }, [availableSymbols]);

  const handleChange = e => {
    const checkedItems = state.filter(x => x.checked);
    const currentIsInChecked = checkedItems.find(x => x.id === e.target.id);
    if (checkedItems.length >= SOURCE_LIMIT && !currentIsInChecked) {
      return;
    }

    const selectedItems = state.map((s: ConfigurationSymbolItem) =>
      s.id === e.target.id ? { ...s, checked: e.target.checked } : s,
    );

    setState(selectedItems);

    const convertToEntity = (array): any => {
      const entities = {};
      array.map(x => {
        entities[x.id] = x;
      });
      return entities;
    };

    setLocalDbData(SELECTED_ITEMS_KEY, convertToEntity(selectedItems));
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="cryptoexchange-configuration">
      <div className="page-info">
        <div className="header">
          <h4>
            <Link to={url}>{t('cryptoexchangeTitle')}</Link>
          </h4>
          <Title>{t('configuration')}</Title>
        </div>
        <div className="data">
          <Subtitle type="primary">
            {t('chooseTickerSymbols')} {SOURCE_LIMIT}.
          </Subtitle>
          {state.map(s => {
            return (
              <div key={s.id} className="configuration-row">
                <input
                  onChange={handleChange}
                  checked={s.checked}
                  type="checkbox"
                  id={s.id}
                  name={s.id}
                  value={`t${s.id}`}
                />
                <label htmlFor={s.id}>{s.id}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
