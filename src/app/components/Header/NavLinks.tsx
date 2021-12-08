import { makeSelectIsUserAuthenticated } from 'app/providers/AuthProvider/selectors';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function NavLinks() {
  const { t } = useTranslation();
  const isUserLoggedIn = useSelector(makeSelectIsUserAuthenticated);
  return (
    <>
      {isUserLoggedIn ? (
        <>
          <NavLink
            activeClassName="active"
            to="/applications/wishlist"
            className="nav-item"
          >
            {t('wishlistTitle')}
          </NavLink>
          <NavLink
            activeClassName="active"
            to="/applications/cryptoexchange"
            className="nav-item"
          >
            {t('cryptoexchangeTitle')}
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            activeClassName="active"
            to="/applications"
            className="nav-item"
          >
            {t('applications')}
          </NavLink>
        </>
      )}
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
    </>
  );
}
