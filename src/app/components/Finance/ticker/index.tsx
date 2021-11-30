import './style.scss';

export default function Ticker({
  data = [] as Array<string>,
  renderer = (...args: any): JSX.Element => <span />,
}) {
  const renderItems = () => {
    return (
      <div className="ticker-list">
        {data.slice(0, data.length).map(
          (d: any, i: number): JSX.Element => (
            <div key={i} className="ticker-item">
              {renderer(d)}
            </div>
          ),
        )}
      </div>
    );
  };
  return (
    <div className="ticker">
      {renderItems()}
      {renderItems()}
    </div>
  );
}
