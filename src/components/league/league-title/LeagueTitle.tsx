import { type PropsWithChildren } from 'react';
import { type LeagueType } from '../../../types/League';

export const leagueIcons: Partial<Record<LeagueType, string>> = {
  continuous: 'tools_ladder',
  season: 'calendar_month',
  tournament: 'family_history',
};

type LeagueTitleProps = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  type?: LeagueType;
};

export function LeagueTitle({
  as,
  type,
  children,
}: PropsWithChildren<LeagueTitleProps>): JSX.Element {
  const Tag = as;
  return (
    <Tag style={{ display: 'inline-block' }}>
      {type && (
        <>
          <span className="material-symbols-outlined">{leagueIcons[type]}</span>{' '}
        </>
      )}
      {children}
    </Tag>
  );
}
