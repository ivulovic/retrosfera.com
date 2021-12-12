import { Children, useEffect, useState } from 'react';
import { DataContext } from './DataContext';

export default function DataProvider(props) {
  const [daily, setDaily] = useState([]);
  const [monthly, setMonthly] = useState([]);
  useEffect(() => {
    fetch('/data/covid19/monthlySummary.json')
      .then(res => res.json())
      .then(setMonthly);
    fetch('/data/covid19/dailySummary.json')
      .then(res => res.json())
      .then(setDaily);
  }, []);
  return (
    <DataContext.Provider
      value={{
        daily,
        monthly,
      }}
    >
      {Children.only(props.children)}
    </DataContext.Provider>
  );
}
