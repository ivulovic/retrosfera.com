import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { register } from 'app/providers/AuthProvider/actions';

import Input from 'app/components/Input';
import { Link } from 'react-router-dom';
import '../style.scss';
import Button from 'app/components/Button';

export function RegisterPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const onChange = e => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = () => {
    if (
      email &&
      firstName &&
      lastName &&
      password &&
      password === confirmPassword
    ) {
      dispatch(register({ email, firstName, lastName, password }));
    }
  };
  return (
    <>
      {/* <Helmet>
        <title>{websiteMetaTitleRegisterPage}</title>
        <meta name="description" content={websiteMetaDescriptionRegisterPage} />
      </Helmet>  */}
      <div className="page-wrapper auth-page">
        <div className="auth-form">
            <Input
              id="register-email"
              label={t('email')}
              name="email"
              type={'text'}
              value={undefined}
              onChange={onChange}
            />
            {/* <Input
              id="register-firstName"
              label={t('firstName')}
              name="firstName"
              type={'text'}
              value={undefined}
              onChange={onChange}
            />
            <Input
              id="register-lastName"
              label={t('lastName')}
              name="lastName"
              type={'text'}
              value={undefined}
              onChange={onChange}
            /> */}
            <Input
              id="login-password"
              label={t('password')}
              name="password"
              type={'password'}
              value={undefined}
              onChange={onChange}
            />
            <Input
              id="login-confirmPassword"
              label={t('confirmPassword')}
              name="confirmPassword"
              type={'password'}
              value={undefined}
              onChange={onChange}
            />
        </div>
        <div className="auth-form-footer">
          <Button onClick={onSubmit}>{t('register')}</Button>
          <div>
            {t('alreadyRegistered')}{' '}
            <Link to="/login">{t('login')}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
