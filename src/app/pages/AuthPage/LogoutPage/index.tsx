import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'app/providers/AuthProvider/actions';

export default function LogoutPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUser());
  }, []);
  return <div className="page-wrapper"></div>;
}
