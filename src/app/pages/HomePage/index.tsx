import SearchInput from 'app/components/SearchInput';
import Logo from 'app/icons/Logo';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import Thumbnail from 'app/components/Thumbnail';
import './style.scss';
import WishlistOutline from 'app/icons/WishlistOutline';
import BitcoinOutline from 'app/icons/BitcoinOutline';
import SettingsOutline from 'app/icons/SettingsOutline';
import VirusOutline from 'app/icons/VirusOutline';
import PlantOutline from 'app/icons/PlantOutline';

export default function HomePage() {
  const history = useHistory();
  const onNavigate = term => {
    console.log('goto ', term, '/search?q=' + encodeURIComponent(term));
    return history.push('/search?q=' + encodeURIComponent(term));
  };
  const { t } = useTranslation();
  return (
    <div className="page-wrapper home-page">
      <div className="page-logo-wrapper">
        <Logo width={64} height={64} />
        <h1 className="logo-title">{t('appName')}</h1>
      </div>
      <SearchInput onSelect={onNavigate} />
      <div className="quick-access">
        <Thumbnail
          link={'/air-quality'}
          icon={PlantOutline}
          title={'airQualityTitle'}
        />
        <Thumbnail
          link={'/covid19'}
          icon={VirusOutline}
          title={'covid19Title'}
        />
        <Thumbnail
          link={'/applications/wishlist'}
          icon={WishlistOutline}
          title={'wishlistTitle'}
        />
        <Thumbnail
          link={'/applications/cryptoExchange'}
          icon={BitcoinOutline}
          title={'cryptoexchangeTitle'}
        />
        <Thumbnail
          link={'/settings'}
          icon={SettingsOutline}
          title={'settings'}
        />
      </div>
    </div>
  );
}
