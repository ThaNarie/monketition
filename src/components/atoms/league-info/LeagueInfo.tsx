import { type LeagueType } from '../../../types/League';
import { Icon } from '../icon/Icon';

export const leagueIcons: Partial<Record<LeagueType, string>> = {
  continuous: 'tools_ladder',
  season: 'calendar_month',
  tournament: 'family_history',
};

export const leagueTypeMap: Record<LeagueType, string> = {
  continuous: 'Permanent Ladder',
  season: 'Season Ladder',
  tournament: 'Tournament',
};

type LeagueInfoProps = {
  type: LeagueType | undefined;
};
export function LeagueInfo({ type }: LeagueInfoProps): JSX.Element | null {
  return type ? (
    <div className="league-info">
      <Icon icon={leagueIcons[type]!} size={18} /> {leagueTypeMap[type]}
    </div>
  ) : null;
}
