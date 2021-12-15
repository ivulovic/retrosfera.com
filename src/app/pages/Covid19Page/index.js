import DataProvider from './DataProvider';
import Content from './Content';
import './style.scss';

export default function CovidPage() {
  return (
    <main className="page-wrapper covid-page">
      <DataProvider>
        <Content />
      </DataProvider>
    </main>
  );
}
