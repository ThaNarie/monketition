import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { BarChart } from '../../../atoms/bar-chart/BarChart';

export function ActivityChart(): JSX.Element {
  // TODO: calculate amount of matches on each day, and fill splice and pad up to 50 items
  const seriesData = useMemo(
    () => Array.from({ length: 50 }, () => Math.floor(Math.random() * 100)),
    [],
  );

  return <BarChart dataPoints={seriesData} height={25} amount={50} />;
}
