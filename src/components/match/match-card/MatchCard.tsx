/* eslint-disable @typescript-eslint/naming-convention */
import classNames from 'clsx';
import { format } from 'date-fns';
import { useProfileUser, useUser } from '../../../data/me';
import { type Match } from '../../../types/Match';
import { type Participant } from '../../../types/Participant';
import { OfficeInfo } from '../../atoms/office-info/OfficeInfo';
import { SportInfo } from '../../atoms/sport-info/SportInfo';
import './match-card.scss';
import { EloInfo } from './components/EloInfo';
import { ParticipantName } from './components/ParticipantName';

type MatchCardProps = {
  className?: string;
  match: Match;
  showDetails?: boolean;
  showFooter?: boolean;
};

export function MatchCard({
  className,
  match,
  showDetails = false,
  showFooter = false,
}: MatchCardProps): JSX.Element {
  const winnerIndex = match.gameScore[0].score > match.gameScore[1].score ? 0 : 1;
  const me = useUser();
  const profileUser = useProfileUser() ?? me;

  function isProfileUser(participant: Participant): boolean {
    return participant.user.id === profileUser.id;
  }

  return (
    <div
      className={classNames('card match-card', className, {
        'match-winner': isProfileUser(match.winner),
        'match-loser': isProfileUser(match.loser),
      })}
    >
      <div className="card-body">
        {match.playedAt && (
          <div className="match-date">
            <small>{format(match.playedAt, 'd LLL y H:mm ')}</small>
          </div>
        )}

        <div className="participants">
          <ParticipantName participant={match.participants[0]} isWinner={winnerIndex === 0} />
          <span className="versus text-muted">vs</span>
          <ParticipantName participant={match.participants[1]} isWinner={winnerIndex === 1} />
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

            {showDetails && (
              <div className="set-scores">
                {match.setScores.map((set, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className="set-score" key={index}>
                    <div>
                      <span
                        className={classNames(set[0].score > set[1].score ? 'winner' : 'loser')}
                      >
                        {set[0].score}
                      </span>
                    </div>
                    <small className="text-muted"></small>
                    <div>
                      <span
                        className={classNames(set[1].score > set[0].score ? 'winner' : 'loser')}
                      >
                        {set[1].score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="info info-right">
            <EloInfo elo={match.eloInfo[1]} />
          </div>
        </div>
      </div>
      {showFooter && (
        <div className="card-footer">
          <SportInfo sport={match.league.sport} />
          <OfficeInfo office={match.league.office} />
        </div>
      )}
    </div>
  );
}
