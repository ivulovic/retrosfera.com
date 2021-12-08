import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './style.scss';

export default function Thumbnail({ link, icon: Icon, title }) {
  const { t } = useTranslation();
  return (
    <Link to={link} className="thumbnail">
      <Icon width={32} height={32} />
      <div className="thumbnail-details">
        <h3>{t(title)}</h3>
      </div>
    </Link>
  );
}
