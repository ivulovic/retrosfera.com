import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/LoadingIndicator';

export const NotAuthenticatedPage = lazyLoad(
  () => import('./index'),
  module => module.NotAuthenticatedPage,
  {
    fallback: <LoadingIndicator />,
  },
);
