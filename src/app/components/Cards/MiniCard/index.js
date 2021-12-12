import './index.css';
import formatNumber from 'utils/project/number/formatNumber';

export default function MiniCard({
  title,
  value,
  growth,
  labels,
  chartData,
  tooltipFormatter,
  seriesOptions,
}) {
  return (
    <div className="mini-card">
      <h3 className="title">{title}</h3>
      <div className="value-row">
        <h2 className="number value">{formatNumber(value)}</h2>
        {growth && (
          <p className="growth">
            <span
              className={`value number ${
                growth.value < 0
                  ? 'negative'
                  : growth === 0
                  ? 'neutral'
                  : 'positive'
              }`}
            >
              {formatNumber(growth.value)}
            </span>
            <span className="text">{growth.text}</span>
          </p>
        )}
      </div>
    </div>
  );
}
