import { FC, useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts'

import { formatPrice, TokenSeriesEntry } from '../../model';
import { useMedia } from '../../../../shared/useMedia.ts';

export interface TokenChartProps {
  token: string;
  series: TokenSeriesEntry[];
}

export const TokenChart: FC<TokenChartProps> = ({ series, token }) => {
  const isDesktop = useMedia('desktop');

  const chartEl = useRef<HTMLDivElement>(null);
  const chart = useRef<ApexCharts>();

  useEffect(() => {
    if (chart.current) return;
    chart.current = new ApexCharts(chartEl.current, {
      chart: {
        type: 'area',
        stacked: false,
        height: 300,
        width: isDesktop ? 600 : 350,
        toolbar: { show: false },
      },
      yaxis: {
        title: {
          text: token,
          style: {
            color: '#dedede',
          },
        },
        labels: {
          formatter: (val: number) => formatPrice(val),
          style: {
            colors: '#dedede',
          },
        },
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (val: number) => formatPrice(val, token),
        },
      },
      grid: {
        borderColor: '#2f2f2f',
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#dedede',
          },
        },
      },
      dataLabels: { enabled: false },
      series: [{
        name: '',
        data: series.map((entry) => ({ x: entry.time, y: entry.value })),
      }],
    });

    chart.current.render();
  }, []);

  return (
    <div id="chart" ref={chartEl} />
  )
};
