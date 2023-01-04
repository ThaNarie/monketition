import { differenceInCalendarDays } from 'date-fns';
import { useMemo } from 'react';
import { type Match } from '../../../../types/Match';
import { BarChart } from '../../../atoms/bar-chart/BarChart';

export type ActivityChartProps = {
  matches: Array<Match>;
  amount?: number | 'all';
  height?: number;
};
export function ActivityChart({
  matches,
  amount = 60,
  height = 25,
}: ActivityChartProps): JSX.Element {
  // TODO: reverse when we sort on newest first
  const amountOfDays =
    amount === 'all' ? differenceInCalendarDays(new Date(), matches[0].playedAt) : amount;
  const seriesData = useMemo(() => {
    const data = Array.from({ length: amountOfDays }, () => 0);
    for (const match of matches) {
      const daysAgo = differenceInCalendarDays(new Date(), match.playedAt);
      if (daysAgo < data.length) {
        data[data.length - daysAgo] += 1;
      }
    }
    return data;
  }, [matches, amountOfDays]);

  return <BarChart dataPoints={seriesData} height={height} amount={seriesData.length} />;
}
