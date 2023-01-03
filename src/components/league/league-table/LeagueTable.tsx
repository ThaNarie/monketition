/* eslint-disable @typescript-eslint/naming-convention */
import classNames from 'clsx';
import { startCase } from 'lodash-es';
import { Link } from 'react-router-dom';
import { useUser } from '../../../data/me';
import { useIsStuck } from '../../../hooks/useIsStuck';
import { type League } from '../../../types/League';
import './league-table.scss';
import { StreakInfo } from '../../atoms/streak-info/StreakInfo';

type LeagueTableProps = {
  results: League['results'];
};
export function LeagueTable({ results }: LeagueTableProps): JSX.Element {
  const { ref, isStuck } = useIsStuck();
  const me = useUser();
  return (
    <table
      className={classNames('league-table table table-hover table-borderless', {
        'is-stuck': isStuck,
      })}
    >
      <thead>
        <tr>
          <th ref={ref} scope="col" className="head-rank" style={{ width: 60, textAlign: 'right' }}>
            #
          </th>
          <th scope="col">Participant</th>
          <th scope="col" style={{ width: 70, textAlign: 'right' }}>
            Score
          </th>
          <th scope="col" style={{ width: 100, textAlign: 'center' }}>
            Streak
          </th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {results?.map((result, index) => (
          <tr
            key={result.rank}
            className={classNames({ selected: result.participant.user.id === me.id })}
          >
            <td className="cell-rank" style={{ textAlign: 'right' }}>
              {result.rank}
            </td>
            <td className="participant">
              <div className="avatar">
                <img
                  className="rounded-circle shadow-4-strong me-2"
                  alt="avatar2"
                  src={`https://i.pravatar.cc/32?u=${result.participant.user.name}`}
                />
              </div>
              <div>
                <Link to={`/profile/${result.participant.user.id}`}>
                  <div className="name">{result.participant.user.name}</div>
                </Link>
                <div>
                  <small>
                    <span className="text-muted">{startCase(result.participant.user.office)}</span>
                    {' – '}
                    <span className="text-muted">{result.participant.user.jobType}</span>
                  </small>
                </div>
              </div>
            </td>
            <td style={{ textAlign: 'right' }}>{result.score}</td>
            <td style={{ textAlign: 'center' }}>
              <StreakInfo
                streak={result.participant.currentStreak}
                range={2}
                iconSize={index === 0 ? 24 : 18}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
