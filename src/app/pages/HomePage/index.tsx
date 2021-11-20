import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Masthead } from './Masthead';
import { PageWrapper } from 'app/components/PageWrapper';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <PageWrapper>
        <Masthead />
      </PageWrapper>
    </>
  );
}
