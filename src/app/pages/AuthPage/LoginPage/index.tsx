import React from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { login } from 'app/providers/AuthProvider/actions';
import { useTranslation } from 'react-i18next';
import '../style.scss';
// import { translations } from 'locales/i18n';
// import {
//   websiteName,
//   websiteMetaTitleLoginPage,
//   websiteMetaDescriptionLoginPage,
// } from 'settings';

import Input from 'app/components/Input';
import { Link } from 'react-router-dom';
import Button from 'app/components/Button';

export function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChange = e => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };
  const onSubmit = () => dispatch(login({ email, password }));
  return (
    <>
      {/* <Helmet>
        <title>{websiteMetaTitleLoginPage}</title>
        <meta name="description" content={websiteMetaDescriptionLoginPage} />
      </Helmet> */}
      <div className="page-wrapper auth-page">
        <div className="auth-form">
          <Input
            id="login-email"
            label={t('email')}
            name="email"
            type={true ? 'text' : 'password'}
            value={undefined}
            onChange={onChange}
          />
          <Input
            id="login-password"
            label={t('password')}
            name="password"
            type={'password'}
            value={undefined}
            onChange={onChange}
          />
        </div>
        <div className="auth-form-footer">
          <Button onClick={onSubmit}>{t('login')}</Button>
          <div>
            {t('noAccount')} <Link to="/register">{t('register')}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
