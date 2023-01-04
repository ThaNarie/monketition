/* eslint-disable @typescript-eslint/naming-convention */
import classNames from 'clsx';
import { startCase } from 'lodash-es';
import { useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUser } from '../../../data/me';
import { useIsStuck } from '../../../hooks/useIsStuck';
import { type League } from '../../../types/League';
import './league-table.scss';
import { Avatar } from '../../atoms/avatar/Avatar';
import { StreakInfo } from '../../atoms/streak-info/StreakInfo';

type LeagueTableProps = {
  results: League['results'];
  amount?: number;
};
export function LeagueTable({ results, amount = 10 }: LeagueTableProps): JSX.Element {
  const [allVisible, setAllVisible] = useState(false);
  const { ref, isStuck } = useIsStuck();
  const me = useUser();

  const resultsToDisplay = useMemo(() => {
    if (allVisible) {
      return results;
    }
    const topResults = results.slice(0, amount);

    // check if i am in the top results
    // if not, add me to the bottom
    const myResult = results.find((result) => result.participant.user.id === me.id);
    if (myResult && !topResults.includes(myResult)) {
      topResults.push(myResult);
    }

    return topResults;
  }, [results, amount, allVisible, me.id]);

  return (
    <div className="league-table mb-5">
      <table
        className={classNames('league-table table table-hover table-borderless mb-0', {
          'is-stuck': isStuck,
        })}
      >
        <thead>
          <tr>
            <th
              ref={ref}
              scope="col"
              className="head-rank"
              style={{ width: 60, textAlign: 'right' }}
            >
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
          {resultsToDisplay.map((result, index) => (
            <tr
              key={result.rank}
              className={classNames({
                selected: result.participant.user.id === me.id,
                dangling: result.rank > index + 1,
              })}
            >
              <td className="cell-rank" style={{ textAlign: 'right' }}>
                {result.rank}
              </td>
              <td className="participant">
                <div className="avatar-container">
                  <Avatar user={result.participant.user} className="me-2" />
                </div>
                <div>
                  <Link to={`/profile/${result.participant.user.id}`}>
                    <div className="name">{result.participant.user.name}</div>
                  </Link>
                  <div>
                    <small>
                      <span className="text-muted">
                        {startCase(result.participant.user.office)}
                      </span>
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
      {results.length > amount && (
        <div className="text-center">
          <Button
            variant="outline-success"
            className="mt-3"
            onClick={(): void => {
              setAllVisible((value) => !value);
            }}
          >
            {allVisible ? <>Show less</> : <>Show all {results.length} players</>}
          </Button>
        </div>
      )}
    </div>
  );
}
