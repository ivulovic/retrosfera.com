import React from 'react';

import { useDispatch } from 'react-redux';
import { logoutUser } from 'app/providers/AuthProvider/actions';

export default function LogoutPage() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);
  return null;
}
