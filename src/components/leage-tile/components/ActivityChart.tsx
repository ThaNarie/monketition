import { useMemo } from 'react';
import Chart from 'react-apexcharts';

export function ActivityChart(): JSX.Element {
  // TODO: calculate amount of matches on each day, and fill splice and pad up to 50 items
  const seriesData = useMemo(
    () => Array.from({ length: 50 }, () => Math.floor(Math.random() * 100)),
    [],
  );

  return (
    <Chart
      options={{
        chart: {
          id: 'basic-bar',
          toolbar: {
            show: false,
          },
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            // columnWidth: '8px',
          },
        },
        colors: ['#000000'],
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: seriesData,
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0,
          },
        },
        legend: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        states: {
          hover: {
            filter: {
              type: 'none',
            },
          },
        },
      }}
      series={[
        {
          name: 'series-1',
          data: seriesData,
        },
      ]}
      type="bar"
      width="100%"
      height="25"
    />
  );
}
