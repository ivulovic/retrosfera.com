import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import './style.scss';

export default function Header(): JSX.Element {
  const { t } = useTranslation();
  return <div className="header">
    <div className="page-wrapper">
      <div className="logo-wrapper">
        <Link to="/" className="logo-title">{t('appName')}</Link>
        {/* <div className="logo-description"></div> */}
      </div>
      <div className="nav-wrapper">
        <NavLink activeClassName="active" to="/applications" className="nav-item">{t('applications')}</NavLink>
        <NavLink activeClassName="active" to="/settings" className="nav-item">{t('settings')}</NavLink>
      </div>
    </div>
  </div>
}