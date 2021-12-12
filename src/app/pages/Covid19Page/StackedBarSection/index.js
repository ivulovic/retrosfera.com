import useOnResize from 'app/hooks/useOnResize';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef } from 'react';
import { renderTimestampDate } from 'utils/project/date/covid';
import formatNumber from 'utils/project/number/formatNumber';

export default function StackedBarSection({ data }) {
  const { width } = useOnResize();
  const chartRef = useRef();
  const getChart = chart => {
    chartRef.current = chart;
  };
  const onResize = () => {
    const innerWidth = width - 16;
    const maxWidth = 960 - 16;
    chartRef.current.setSize(innerWidth > maxWidth ? maxWidth : innerWidth);
  };

  useEffect(() => {
    onResize();
  }, [width]);

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      gridLineWidth: 0,
      lineWidth: 0,
      labels: {
        formatter: function () {
          return renderTimestampDate(this.value, { showDay: false });
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
      gridLineWidth: 0,
      lineWidth: 0,
      labels: {
        formatter: function () {
          return formatNumber(this.value, false, 0);
        },
      },
      stackLabels: {
        enabled: false,
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        // The first returned item is the header, subsequent items are the
        // points
        const self = this;
        return [
          '<b>' + renderTimestampDate(this.x, { showDay: false }) + '</b><br/>',
        ].concat(
          this.points
            ? this.points.map(function (point, i) {
                const legendSymbol =
                  "<svg width='16' height='16'>" +
                  point.series.legendSymbol.element.outerHTML +
                  '</svg>';
                let result =
                  legendSymbol +
                  ' ' +
                  point.series.name +
                  ': ' +
                  formatNumber(point.y, false, 0) +
                  '';
                if (i !== self.points.length - 1) {
                  result += '<br/>';
                }
                return result;
              })
            : [],
        );
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
      series: {
        borderColor: 'transparent',
      },
    },
    series: [
      // {
      //   name: 'Опорављени',
      //   data: data.recovered,
      //   color: 'var(--success)'
      // },
      {
        name: 'Потврђени',
        data: data.confirmed,
        color: 'var(--positive)',
      },
      {
        name: 'Преминули',
        data: data.deaths,
        color: 'var(--negative)',
      },
      {
        name: 'Тестирани',
        data: data.tested,
        color: '#00b8d4',
      },
      {
        name: 'Хоспитализовани',
        data: data.hospitalized,
        color: '#ffc107',
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        callback={getChart}
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}
