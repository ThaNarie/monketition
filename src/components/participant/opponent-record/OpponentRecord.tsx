import classNames from 'clsx';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useProfileUser } from '../../../data/me';
import { type User } from '../../../types/User';
import { type OpponentRecordInfo } from '../../../utils/participant/getInfoAboutParticipant';
import { UserInfo } from '../user-info/UserInfo';
import styles from './opponent-record.module.scss';

export type OpponentRecordProps = {
  className?: string;
  opponent: User;
  title: string;
  subtitle?: string;
  statValue: ReactNode;
  statClassName?: string;
  stats: OpponentRecordInfo;
};
export function OpponentRecord({
  className,
  opponent,
  title,
  subtitle,
  statValue,
  statClassName,
  stats,
}: OpponentRecordProps): JSX.Element {
  const user = useProfileUser();
  return (
    <div className={classNames(styles.opponentRecord, className, 'mt-4 py-3')}>
      <div className={styles.titleWrapper}>
        <div className={styles.titleInfo}>
          <h5>{title}</h5>
          <span className={classNames(styles.titleStat, statClassName)}>{statValue}</span>
        </div>
        <div className="text-muted">
          <small>{subtitle}</small>
        </div>
      </div>
      <UserInfo className={styles.userInfo} user={opponent} variant="small" hideOffice />
      <div>Played {stats.games} games</div>
      <div>
        <small>
          winning {stats.wins} – losing {stats.losses}
        </small>
      </div>
      <div className="mt-3">
        <Link
          to={`/matches?${user ? `player=${user.id}` : ''}&opponent=${opponent.id}`}
          className="text-secondary"
        >
          See all matches
        </Link>
      </div>
      {/*<p>
        You won {7} of the {12} total games
      </p>
      <p>
        won {7} – total {12} – ratio 35%
      </p>
      <p>7 - 5 - 12</p>
      <p>W7 L5 T12</p>
      <div className="streak-record-line">
        <span className="label">Played</span> <span>{12}</span>
      </div>
      <div className="streak-record-line">
        <span className="label">Won</span>{' '}
        <span>
          {Math.round(0.34 * 100)}% ({5})
        </span>
      </div>*/}
    </div>
  );
}
