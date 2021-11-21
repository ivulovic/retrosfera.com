import WishlistPage from 'app/pages/WishlistPage';
import { Redirect, useParams } from 'react-router';
import { ApplicationDetailsParams } from '../types';

const Components = {
  wishlist: WishlistPage,
};

export default function ApplicationMain(): JSX.Element {
  const params = useParams<ApplicationDetailsParams>();
  const { applicationId } = params;
  const Component = Components[applicationId.toLowerCase()];
  if (!Component) {
    return <Redirect to="/applications" />;
  }
  return <Component />;
}
