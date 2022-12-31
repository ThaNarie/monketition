import classNames from 'clsx';
import {
  format,
  formatDistanceToNowStrict,
  differenceInCalendarDays,
  formatDistanceToNow,
} from 'date-fns';
import { type League, type LeagueType } from '../../../types/League';
import './league-progress.scss';

const getLeagueStatus = (league: Pick<League, 'startAt' | 'endAt'>): string => {
  if (league.startAt && differenceInCalendarDays(new Date(), league.startAt) < 0) {
    return 'upcoming';
  }
  if (league.endAt && differenceInCalendarDays(new Date(), league.endAt) > 0) {
    return 'finished';
  }
  return 'ongoing';
};
const getLeagueProgressPrefix = (status: string, type: LeagueType): string => {
  if (status === 'upcoming') {
    return 'Starts ';
  }
  if (status === 'ongoing' && type === 'season') {
    return 'Ends ';
  }
  if (status === 'finished') {
    return 'Finished ';
  }
  return '';
};

const getIconName = (status: string, type: LeagueType): string => {
  if (status === 'upcoming') {
    return 'event_upcoming ';
  }
  if (status === 'ongoing') {
    if (type === 'continuous') {
      return 'event_repeat';
    }
    return 'event ';
  }
  if (status === 'finished') {
    return 'calendar_today';
  }
  return '';
};

type LeagueProgressProps = {
  league: League;
};
export function LeagueProgress({ league }: LeagueProgressProps): JSX.Element {
  const totalDays =
    (league.startAt &&
      league.endAt &&
      differenceInCalendarDays(league.endAt, league.startAt) + 1) ??
    1;
  const currentDay =
    (league.startAt && differenceInCalendarDays(new Date(), league.startAt) + 1) ?? 1;
  const leagueStatus = getLeagueStatus(league);

  let countdownLabel =
    ((leagueStatus === 'upcoming' && league.startAt) || league.endAt) &&
    formatDistanceToNowStrict(leagueStatus === 'upcoming' ? league.startAt! : league.endAt!, {
      addSuffix: true,
      unit: 'day',
    });
  if (league.type === 'tournament' && leagueStatus === 'ongoing') {
    countdownLabel = `Day ${currentDay} of ${totalDays}`;
  }
  if (league.type === 'continuous' && leagueStatus === 'ongoing') {
    countdownLabel = `Running for ${formatDistanceToNow(league.startAt!)}`;
  }
  const prefix = getLeagueProgressPrefix(leagueStatus, league.type);

  return (
    <div className="league-progress">
      <span className="material-symbols-outlined md-48 event-icon">
        {getIconName(leagueStatus, league.type)}
      </span>
      <p className="card-text">
        {league.startAt && format(league.startAt, 'd LLL y')}
        {' – '}
        {league.endAt ? format(league.endAt, 'd LLL y') : 'Indefinitely'}
      </p>
      <p className="card-text">
        <small>
          {prefix}
          {countdownLabel}
        </small>
      </p>
      <div
        className="progress"
        role="progressbar"
        aria-label="Example 1px high"
        aria-valuenow={currentDay}
        aria-valuemin={0}
        aria-valuemax={totalDays}
        style={{ height: 1 }}
      >
        <div
          className={classNames('progress-bar')}
          style={{ width: `${(currentDay / totalDays) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
