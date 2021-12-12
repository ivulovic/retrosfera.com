import DataProvider from './DataProvider';
import Content from './Content';
import './index.css';

export default function CovidPage() {
  return (
    <main className="page-wrapper">
      <DataProvider>
        <Content />
      </DataProvider>
    </main>
  );
}
