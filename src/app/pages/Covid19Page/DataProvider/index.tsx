import { Children, useEffect, useState } from 'react';
import { DataContext } from './DataContext';

export default function DataProvider(props) {
  const [daily, setDaily] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [ambulances, setAmbulances] = useState([]);
  const [loadingCount, setLoadingCount] = useState(0);
  useEffect(() => {
    fetch('/data/covid19/monthlySummary.json')
      .then(res => res.json())
      .then(res => {
        setMonthly(res);
        setLoadingCount(s => s + 1);
      });
    fetch('/data/covid19/dailySummary.json')
      .then(res => res.json())
      .then(res => {
        setDaily(res);
        setLoadingCount(s => s + 1);
      });
    fetch('/data/covid19/ambulances.json')
      .then(res => res.json())
      .then(res => {
        setAmbulances(res.data);
        setLoadingCount(s => s + 1);
      });
  }, []);
  return (
    <DataContext.Provider
      value={{
        daily,
        monthly,
        ambulances,
        isLoading: loadingCount < 3,
      }}
    >
      {Children.only(props.children)}
    </DataContext.Provider>
  );
}
