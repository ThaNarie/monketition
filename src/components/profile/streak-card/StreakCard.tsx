import { faker } from '@faker-js/faker';
import { useCallback, useMemo } from 'react';
import { type Participant } from '../../../types/Participant';
import { type Sport } from '../../../types/Sport';
import { getOpponentRecords } from '../../../utils/participant/getOpponentRecords';
import { BarChart } from '../../atoms/bar-chart/BarChart';
import { SportInfo } from '../../atoms/sport-info/SportInfo';
import { StreakInfo } from '../../atoms/streak-info/StreakInfo';
import './streak-card.scss';

type StreakCardProps = {
  participant: Pick<
    Participant,
    'currentStreak' | 'bestStreak' | 'worstStreak' | 'matches' | 'league'
  >;
};
export function StreakCard({ participant }: StreakCardProps): JSX.Element {
  const amount = 30;
  // get win/loss info in array, where win is 1 and loss is -1
  const matchHistory = useMemo(
    () => [
      ...Array.from({ length: amount - participant.matches.length }, () => ({
        streak: 0,
        elo: 1500,
      })),
      ...participant.matches.map((match) => ({
        streak: match.winner === participant ? 1 : -1,
        elo: match.eloInfo.find((elo) => elo.participant === participant)?.newScore,
      })),
    ],
    [participant, amount],
  );

  const eloHistory = useMemo(() => matchHistory.map((match) => match.elo ?? 0), [matchHistory]);

  const gamesWonCount = useMemo(
    () => participant.matches.filter((match) => match.winner === participant).length,
    [participant],
  );

  const opponentRecords = useMemo(() => getOpponentRecords(participant), [participant]);

  const getColor = useCallback(
    ({ dataPointIndex }: { dataPointIndex: number | undefined }) => {
      if (dataPointIndex === undefined || matchHistory[dataPointIndex].streak === 0) {
        return 'rgba(0, 0, 0, 0)';
      }

      return matchHistory[dataPointIndex].streak > 0 ? '#bbb' : '#444';
    },
    [matchHistory],
  );

  return (
    <div className="streak-card card">
      <div className="card-body ">
        <SportInfo sport={participant.league.sport} />
        <div className="streak-record">
          <div className="streak-record-line">
            <span className="label">Current</span>{' '}
            <StreakInfo streak={participant.currentStreak} reverse />
          </div>
          <div className="mb-3">
            <div className="chart chart-elo">
              <BarChart
                type="line"
                dataPoints={eloHistory}
                height={50}
                color="#444"
                amount={amount}
              />
            </div>
            <div className="chart chart-streak">
              <BarChart
                dataPoints={matchHistory.map(() => 1)}
                height={5}
                color={getColor}
                amount={amount}
              />
            </div>
          </div>
          <div className="streak-record-line">
            <span className="label">Best</span>{' '}
            <StreakInfo streak={participant.bestStreak} reverse />
          </div>
          <div className="streak-record-line">
            <span className="label">Worst</span>{' '}
            <StreakInfo streak={participant.worstStreak} reverse />
          </div>
          <div className="streak-record-line">
            <span className="label">Games played</span> <span>{participant.matches.length}</span>
          </div>
          <div className="streak-record-line">
            <span className="label">Games won</span>{' '}
            <span>
              {Math.round((gamesWonCount / participant.matches.length) * 100)}% ({gamesWonCount})
            </span>
          </div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {[
          { heading: 'Most played against', data: opponentRecords.mostPlayedAgainst },
          { heading: 'Most won against', data: opponentRecords.mostWonAgainst },
          { heading: 'Most lost against', data: opponentRecords.mostLostAgainst },
        ].map(({ heading, data }) => (
          <li className="list-group-item" key={heading}>
            <h6 className="label">{heading}</h6>
            <p>{data.participant.user.name}</p>
            <div className="streak-record-line">
              <span className="label">Games played</span> <span>{data.games}</span>
            </div>
            <div className="streak-record-line">
              <span className="label">Games won</span>{' '}
              <span>
                {Math.round(data.winRatio * 100)}% ({data.wins})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
