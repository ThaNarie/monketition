/* eslint-disable @typescript-eslint/naming-convention */
import classNames from 'clsx';
import { format } from 'date-fns';
import { type Match } from '../../types/Match';
import './match-tile.scss';
import { type Participant } from '../../types/Participant';
import { OfficeInfo } from '../atoms/office-info/OfficeInfo';
import { SportInfo } from '../atoms/sport-info/SportInfo';

type EloInfoProps = {
  elo: Match['eloInfo'][number];
};
function EloInfo({ elo }: EloInfoProps): JSX.Element {
  return (
    <span className="elo">
      <div>{elo.scoreBefore}</div>
      <small
        className={classNames('elo-change text-end', {
          'text-success': elo.scoreChange > 0,
          'text-danger': elo.scoreChange < 0,
          'text-muted': elo.scoreChange === 0,
        })}
      >
        {elo.scoreChange > 0 ? '+' : ''}
        {elo.scoreChange}
      </small>
    </span>
  );
}

type ParticipantNameProps = {
  participant: Participant;
  isWinner: boolean;
  isMe: boolean;
};
function ParticipantName({ participant, isWinner, isMe }: ParticipantNameProps): JSX.Element {
  return (
    <div
      className={classNames('participant', isWinner ? 'winner' : 'loser', {
        'is-me': isMe,
      })}
    >
      <h5 className="name">{participant.name}</h5>
    </div>
  );
}

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
          <ParticipantName
            participant={match.participants[0]}
            isWinner={winnerIndex === 0}
            isMe={match.participants[0] === me}
          />
          <span className="versus text-muted">vs</span>
          <ParticipantName
            participant={match.participants[1]}
            isWinner={winnerIndex === 1}
            isMe={match.participants[1] === me}
          />
        </div>

        <div className="match-details">
          <div className="info info-left">
            <EloInfo elo={match.eloInfo[0]} />
          </div>
          <div className="scores">
            <div className="game-score">
              <div>
                <h4 className={winnerIndex === 0 ? 'winner' : 'loser'}>
                  {match.gameScore[0].score}
                </h4>
              </div>
              <small className="text-muted"></small>
              <div>
                <h4 className={winnerIndex === 1 ? 'winner' : 'loser'}>
                  {match.gameScore[1].score}
                </h4>
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
          <div className="info info-right">
            <EloInfo elo={match.eloInfo[1]} />
          </div>
        </div>
      </div>
      <div className="card-footer">
        <SportInfo sport={match.league.sport} />
        <OfficeInfo office={match.league.office} />
      </div>
    </div>
  );
}
