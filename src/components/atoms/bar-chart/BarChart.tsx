import { useMemo } from 'react';
import Chart from 'react-apexcharts';

type BarChartProps = {
  type?: 'bar' | 'line';
  dataPoints: Array<number>;
  height: number;
  amount?: number;
  color?:
    | string
    | ((options: { value: number; seriesIndex: number; dataPointIndex: number; w: any }) => string);
};
export function BarChart({
  type = 'bar',
  dataPoints,
  amount = 50,
  color = '#ffffff',
  height,
}: BarChartProps): JSX.Element {
  const seriesData = useMemo(
    () => [
      ...Array.from<number, number>({ length: amount - dataPoints.length }, () => 0),
      ...dataPoints.slice(-amount),
    ],
    [amount, dataPoints],
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
            columnWidth: '100%',
          },
        },
        colors: [color],
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
      type={type}
      width="100%"
      height={height}
    />
  );
}
