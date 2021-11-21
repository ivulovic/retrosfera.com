import { Link } from 'app/components/Link';
import { Helmet } from 'react-helmet-async';
import Title from 'app/components/Title';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta name="description" content="Not Found" />
      </Helmet>
      <div className="page-content-centered">
        <Title>404</Title>

        <Link to="/">Go Home</Link>
      </div>
    </>
  );
}