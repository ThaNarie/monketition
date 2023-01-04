/* eslint-disable @typescript-eslint/naming-convention */
import classNames from 'clsx';
import { type Match } from '../../../../types/Match';

type EloInfoProps = {
  elo: Match['eloInfo'][number];
};
export function EloInfo({ elo }: EloInfoProps): JSX.Element {
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
