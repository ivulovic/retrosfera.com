import useOnResize from 'app/hooks/useOnResize';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { renderTimestampDate } from 'utils/project/date/covid';
import formatNumber from 'utils/project/number/formatNumber';
import { StackedBarProps } from '../types';

export default function StackedBarSection(props: StackedBarProps) {
  const { data } = props;
  const { t } = useTranslation();
  const { width } = useOnResize();
  const chartRef = useRef<any>();
  const getChart = chart => {
    chartRef.current = chart;
  };
  const onResize = () => {
    const innerWidth = width! - 16;
    const maxWidth = 960 - 16;
    chartRef.current?.setSize(innerWidth > maxWidth ? maxWidth : innerWidth);
  };

  useEffect(() => {
    if (width) {
      onResize();
    }
  }, [width]);

  const options = {
    chart: {
      height: 600,
      type: 'column',
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      gridLineWidth: 0,
      lineWidth: 0,
      tickPositions: data.confirmed.map(x => x[0]),
      labels: {
        rotation: -50,
        align: 'right',
        style: {
          textOverflow: 'none',
          whiteSpace: 'nowrap',
        },
        formatter: function () {
          // @ts-ignore
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
          // @ts-ignore
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
          // @ts-ignore
          '<b>' + renderTimestampDate(this.x, { showDay: false }) + '</b><br/>',
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
