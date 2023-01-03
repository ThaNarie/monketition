import { faker } from '@faker-js/faker';
import { useCallback } from 'react';
import { type Participant } from '../../../types/Participant';
import { type Sport } from '../../../types/Sport';
import { BarChart } from '../../atoms/bar-chart/BarChart';
import { SportInfo } from '../../atoms/sport-info/SportInfo';
import { StreakInfo } from '../../atoms/streak-info/StreakInfo';
import './streak-card.scss';

type StreakCardProps = {
  streakInfo: Pick<Participant, 'currentStreak' | 'bestStreak' | 'worstStreak'>;
  sport: Sport;
};
export function StreakCard({ streakInfo, sport }: StreakCardProps): JSX.Element {
  const streakRecord = Array.from({ length: 50 }, () => Math.round(Math.random()) * 2 - 1);
  const eloRecord = Array.from({ length: 50 }, () =>
    faker.datatype.number({ min: 20, max: 50 }),
  ).reduce<Array<number>>(
    (accumulator, item, index) => {
      accumulator.push(accumulator.at(-1)! + item * streakRecord[index]);
      return accumulator;
    },
    [1500],
  );
  const getColor = useCallback(
    ({ dataPointIndex }: { dataPointIndex: number }) =>
      streakRecord[dataPointIndex] > 0 ? '#bbb' : '#444',
    [streakRecord],
  );
  const getEloColor = useCallback(
    ({ dataPointIndex }: { dataPointIndex: number }) =>
      streakRecord[dataPointIndex] > 0 ? '#bbb' : '#444',
    [streakRecord],
  );

  return (
    <div className="streak-card card">
      <div className="card-body ">
        <SportInfo sport={sport} />
        <div className="streak-record">
          <div className="streak-record-line">
            <span className="label">Current</span>{' '}
            <StreakInfo streak={streakInfo.currentStreak} reverse />
          </div>
          <div className="mb-3">
            <div className="chart chart-elo">
              <BarChart
                type="line"
                dataPoints={eloRecord}
                height={50}
                color={getEloColor}
                amount={50}
              />
            </div>
            <div className="chart chart-streak">
              <BarChart
                dataPoints={streakRecord.map(() => 1)}
                height={5}
                color={getColor}
                amount={50}
              />
            </div>
          </div>
          <div className="streak-record-line">
            <span className="label">Best</span>{' '}
            <StreakInfo streak={streakInfo.bestStreak} reverse />
          </div>
          <div className="streak-record-line">
            <span className="label">Worst</span>{' '}
            <StreakInfo streak={streakInfo.worstStreak} reverse />
          </div>
        </div>
      </div>
    </div>
  );
}
