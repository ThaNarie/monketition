/* eslint-disable @typescript-eslint/naming-convention */
import classNames from 'clsx';
import { format } from 'date-fns';
import { getMockSport } from '../../mocks/Sport.mocks';
import { type Match } from '../../types/Match';
import './match-tile.scss';
import { type Participant } from '../../types/Participant';
import { OfficeInfo } from '../atoms/office-info/OfficeInfo';
import { SportInfo } from '../atoms/sport-info/SportInfo';
import { sportIcons } from '../league/leage-tile/LeagueTile';

type MatchTileProps = {
  className?: string;
  match: Match;
  me?: Participant;
};

export function MatchTile({ className, match, me }: MatchTileProps): JSX.Element {
  const winnerIndex = match.gameScore[0].score > match.gameScore[1].score ? 0 : 1;
  return (
    <div
      className={classNames(
        'card match-tile',
        className,
        match.participants[winnerIndex] === me ? 'match-winner' : 'match-loser',
      )}
    >
      <div className="card-body">
        {match.playedAt && (
          <div className="match-date">
            <small>{format(match.playedAt, 'd LLL y H:mm ')}</small>
          </div>
        )}
        <div className="participants">
          <h4
            className={classNames(winnerIndex === 0 ? 'winner' : 'loser', {
              'is-me': match.participants[0] === me,
            })}
          >
            {match.participants[0].name}
          </h4>
          <span className="versus text-muted">vs</span>
          <h4
            className={classNames(winnerIndex === 1 ? 'winner' : 'loser', {
              'is-me': match.participants[1] === me,
            })}
          >
            {match.participants[1].name}
          </h4>
        </div>
        <div className="game-score">
          <div>
            <h4 className={winnerIndex === 0 ? 'winner' : 'loser'}>{match.gameScore[0].score}</h4>
          </div>
          <small className="text-muted"></small>
          <div>
            <h4 className={winnerIndex === 1 ? 'winner' : 'loser'}>{match.gameScore[1].score}</h4>
          </div>
        </div>
        <div className="set-scores">
          {match.setScores.map((set, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="set-score" key={index}>
              <div>
                <span className={classNames(set[0].score > set[1].score ? 'winner' : 'loser')}>
                  {set[0].score}
                </span>
              </div>
              <small className="text-muted"></small>
              <div>
                <span className={classNames(set[1].score > set[0].score ? 'winner' : 'loser')}>
                  {set[1].score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card-footer">
        <SportInfo sport={getMockSport({ type: 'table-tennis' })} />
        <OfficeInfo office="hilversum" />
      </div>
    </div>
  );
}
