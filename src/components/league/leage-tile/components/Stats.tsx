import { format, formatDistanceToNowStrict } from 'date-fns';
import { type League } from '../../../../types/League';
import { StatItem } from './StatItem';
import './stats.scss';

type StatsProps = Pick<Partial<League>, 'lastMatch' | 'endAt' | 'results'>;
// TODO: show progress bar in the card (footer) with the league progress
export function Stats({ lastMatch, endAt, results }: StatsProps): JSX.Element {
  const lastMatchAgo =
    (lastMatch?.playedAt &&
      formatDistanceToNowStrict(lastMatch.playedAt, {
        addSuffix: true,
      })) ??
    null;
  const lastMatchFormatted =
    (lastMatch?.playedAt && format(lastMatch.playedAt, 'd LLL y H:mm ')) ?? null;

  const leagueEndTogo =
    (endAt &&
      formatDistanceToNowStrict(endAt, {
        addSuffix: true,
      })) ??
    null;
  const leagueEndFormatted = (endAt && format(endAt, 'd LLL y ')) ?? null;

  const topPlayer = results?.[0]?.participant ?? null;

  return (
    <div className="stats">
      <div className="player-stats">
        <StatItem icon="group" label={`${results?.length ?? 0}`} tooltip="Player count in league" />
        {topPlayer && (
          <StatItem
            icon="person"
            label={topPlayer.name}
            tooltip={
              <>
                Top player in league with <br />
                Score: {results?.[0]?.score}
                <br />
                Streak: {topPlayer.currentStreak}
              </>
            }
          />
        )}
      </div>
      <div className="schedule-stats">
        {/* TODO: also show start time for upcoming leagues */}
        {endAt && (
          <StatItem
            icon="calendar_month"
            label={leagueEndTogo ?? 'Never Ending'}
            tooltip={
              leagueEndTogo ? (
                <>
                  League ends on <br />
                  {leagueEndFormatted}
                </>
              ) : (
                'League never ends'
              )
            }
          />
        )}
        <StatItem
          icon="schedule"
          label={lastMatchAgo ?? 'Never'}
          tooltip={
            lastMatchAgo ? (
              <>
                Last match played on
                <br />
                {lastMatchFormatted}
              </>
            ) : (
              <>
                No matches played yet,
                <br />
                be the first!
              </>
            )
          }
        />
      </div>
    </div>
  );
}
