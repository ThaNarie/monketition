import { type PropsWithChildren } from 'react';
import { type LeagueType } from '../../../types/League';
import { Icon } from '../../atoms/icon/Icon';
import { leagueIcons } from '../../atoms/league-info/LeagueInfo';

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
          <Icon icon={leagueIcons[type]!} />{' '}
        </>
      )}
      {children}
    </Tag>
  );
}
