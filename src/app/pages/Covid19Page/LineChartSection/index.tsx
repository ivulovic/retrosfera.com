import useOnResize from 'app/hooks/useOnResize';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { renderTimestampDate } from 'utils/project/date/covid';
import formatNumber from 'utils/project/number/formatNumber';
import { LineChartProps } from '../types';

export default function LineChartSection(props: LineChartProps): JSX.Element {
  const { data, type } = props;
  const { t } = useTranslation();
  const { width } = useOnResize();
  const chartRef = useRef<any>();
  const getChart = chart => {
    chartRef.current = chart;
  };
  const onResize = () => {
    const innerWidth = width! - 16;
    const maxWidth = 960 - 16;
    chartRef.current.setSize(innerWidth > maxWidth ? maxWidth : innerWidth);
  };

  useEffect(() => {
    if (width) {
      onResize();
    }
  }, [width]);

  const options = {
    chart: {
      type: 'line',
      style: {
        padding: '0px',
        margin: '0px',
      },
    },
    title: {
      text: '',
    },
    xAxis: {
      // categories: labels,
      type: 'datetime',
      gridLineWidth: 0,
      lineWidth: 0,
      labels: {
        formatter: function () {
          // @ts-ignore
          return renderTimestampDate(this.value, { showDay: type === 'daily' });
        },
      },
    },
    yAxis: {
      title: {
        text: '',
      },
      gridLineWidth: 0,
      minorGridLineWidth: 0,
      labels: {
        formatter: function () {
          // @ts-ignore
          return formatNumber(this.value, false, 0);
        },
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
          '<b>' +
            // @ts-ignore
            renderTimestampDate(this.x, {
              showDay: type === 'daily',
              showFullMonth: type === 'daily',
            }) +
            '</b><br/>',
        ].concat(
          // @ts-ignore
          this.points
            ? // @ts-ignore
              this.points.map(function (point, i) {
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
                // @ts-ignore
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
    series: [
      // {
      //   name: 'Опорављени',
      //   data: data.recovered,
      //   color: 'var(--success)'
      // },
      {
        name: t('confirmed'),
        data: data.confirmed,
        color: 'var(--positive)',
      },
      {
        name: t('deaths'),
        data: data.deaths,
        color: 'var(--negative)',
      },
      {
        name: t('tested'),
        data: data.tested,
        color: '#00b8d4',
      },
      {
        name: t('hospitalized'),
        data: data.hospitalized,
        color: '#ffc107',
      },
      {
        name: t('respiratored'),
        data: data.onRespirator,
        color: '#fd7e14',
      },
    ],
  };
  return (
    <div>
      <HighchartsReact
        options={options}
        callback={getChart}
        highcharts={Highcharts}
      />
    </div>
  );
}
