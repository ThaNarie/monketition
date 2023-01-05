import classNames from 'clsx';
import { type ReactNode } from 'react';
import { type Participant } from '../../../types/Participant';
import { UserInfo } from '../user-info/UserInfo';
import styles from './opponent-record.module.scss';

export type OpponentRecordProps = {
  className?: string;
  opponent: Participant;
  title: string;
  subtitle?: string;
  statValue: ReactNode;
  statClassName?: string;
};
export function OpponentRecord({
  className,
  opponent,
  title,
  subtitle,
  statValue,
  statClassName,
}: OpponentRecordProps): JSX.Element {
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
      <UserInfo className={styles.userInfo} user={opponent.user} variant="small" hideOffice />
      <div>You played 12 games</div>
      <div>
        <small>winning 5 – losing 7</small>
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
