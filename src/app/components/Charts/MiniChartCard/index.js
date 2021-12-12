import './index.css';
import formatNumber from 'utils/project/number/formatNumber';
import SparklineChart from '../../Charts/Sparkline';
export default function MiniChartCard({
  title,
  value,
  growth,
  chartData,
  tooltipFormatter,
  seriesOptions,
}) {
  return (
    <div className="mini-chart-card">
      <h3 className="title">{title}</h3>
      <div className="value-row">
        <h2 className="number value">{formatNumber(value, false, 0)}</h2>
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
      <div>
        <SparklineChart
          data={chartData}
          tooltipFormatter={tooltipFormatter}
          seriesOptions={seriesOptions}
        />
      </div>
    </div>
  );
}
