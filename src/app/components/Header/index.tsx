import Logo from 'app/icons/Logo';
import { makeSelectIsUserAuthenticated } from 'app/providers/AuthProvider/selectors';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import './style.scss';

export default function Header(): JSX.Element {
  const { t } = useTranslation();
  const isUserLoggedIn = useSelector(makeSelectIsUserAuthenticated);
  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="logo-wrapper">
          <Link to="/" className="logo-title">
            <Logo width={24} height={24} />
            {t('appName')}
          </Link>
          {/* <div className="logo-description"></div> */}
        </div>
        <div className="nav-wrapper">
          <NavLink
            activeClassName="active"
            to="/applications"
            className="nav-item"
          >
            {t('applications')}
          </NavLink>
          <NavLink activeClassName="active" to="/settings" className="nav-item">
            {t('settings')}
          </NavLink>
          {isUserLoggedIn && (
            <NavLink activeClassName="active" to="/logout" className="nav-item">
              {t('logout')}
            </NavLink>
          )}
          {!isUserLoggedIn && (
            <NavLink activeClassName="active" to="/login" className="nav-item">
              {t('login')}
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
