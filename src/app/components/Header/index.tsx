import useOnClickOutside from 'app/hooks/useOnClickOutside';
import Logo from 'app/icons/Logo';
import MenuOutline from 'app/icons/MenuOutline';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import NavLinks from './NavLinks';
import './style.scss';

export default function Header(): JSX.Element {
  const { t } = useTranslation();
  const location = useLocation();
  const navbarRef = useRef() as any;
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    setIsNavbarOpen(false);
  }, [location]);

  useOnClickOutside(navbarRef, () => setIsNavbarOpen(false));
  const LogoWrapper = () => (
    <div className="logo-wrapper">
      <Link to="/" className="logo-title">
        <Logo width={32} height={32} />
        {t('appName')}
      </Link>
    </div>
  );
  const HamburgerMenu = () => (
    <div
      onClick={() => setIsNavbarOpen(!isNavbarOpen)}
      className="nav-icon mobile"
    >
      <MenuOutline width={24} height={24} />
    </div>
  );
  return (
    <header className="header">
      <div className="header-wrapper">
        <LogoWrapper />
        <div className="nav-wrapper">
          <NavLinks />
        </div>
        <HamburgerMenu />
        <div
          className={`nav-wrapper mobile ${isNavbarOpen ? 'opened' : 'closed'}`}
          ref={navbarRef}
        >
          <div className="nav-header">
            <HamburgerMenu />
            {t('navigation')}
          </div>
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
