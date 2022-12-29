import classNames from 'clsx';
import { type League } from '../../types/League';
import { LeagueTile } from '../leage-tile/LeagueTile';
import { ComingSoonCard } from './components/ComingSoon';
import './league-groups.css';

type LeagueGroupProps = {
  className?: string;
  groupName: string;
  description?: string;
  leagues?: Array<Partial<League>>;
};

export function LeagueGroup({
  className,
  groupName,
  description,
  leagues,
}: LeagueGroupProps): JSX.Element {
  return (
    <div className={classNames('league-group', className)}>
      <h2>{groupName}</h2>
      <div className="info mb-4">{description && <p>{description}</p>}</div>
      <div className="row row-cols-1 row-cols-lg-2 g-3">
        {leagues ? (
          leagues.map((league) => (
            <div className="col" key={league.slug}>
              <LeagueTile {...league} className="h-100" />
            </div>
          ))
        ) : (
          <ComingSoonCard />
        )}
      </div>
    </div>
  );
}
