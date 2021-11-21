import { CenteredLoading } from 'app/components/CenteredLoading';
import Input from 'app/components/Input';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading } from './selectors';
import { actions } from './slice';

export default function WishlistForm(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const [url, setUrl] = useState('');

  const onSubmit = (e): void => {
    e.preventDefault();
    if (!isLoading && url) {
      dispatch(actions.fetchProductUrl({ url }));
      setUrl('');
    }
  };

  const onChange = e => setUrl(e.target.value);
  if (isLoading) {
    return <CenteredLoading style={{ height: '42px', marginBottom: '25px' }} />;
  }
  return (
    <div className="wishlist-form">
      <form onSubmit={onSubmit}>
        <Input
          placeholder={t('wishlistPlaceholder')}
          pattern="https://.*"
          required
          type="url"
          value={url}
          onChange={onChange}
        />
      </form>
    </div>
  );
}
