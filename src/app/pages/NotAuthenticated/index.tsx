import { Link } from 'app/components/Link';
import { Helmet } from 'react-helmet-async';
import Title from 'app/components/Title';

export function NotAuthenticatedPage() {
  return (
    <>
      <Helmet>
        <title>Not Authenticated</title>
        <meta name="description" content="Not Authenticated" />
      </Helmet>
      <div className="page-content-centered">
        <Title>Not authenticated</Title>

        <Link to="/login">Login</Link>
      </div>
    </>
  );
}