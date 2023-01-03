import classNames from 'clsx';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { type League } from '../../../types/League';
import { Section } from '../../section/Section';
import { LeagueTile } from '../leage-tile/LeagueTile';
import { ComingSoonCard } from './components/ComingSoon';
import './league-groups.css';

type LeagueGroupProps = {
  className?: string;
  groupName: string;
  description?: string;
  leagues?: ReadonlyArray<Partial<League>>;
  showMoreButton?: boolean;
};

export function LeagueGroup({
  className,
  groupName,
  description,
  leagues,
  showMoreButton = false,
}: LeagueGroupProps): JSX.Element {
  return (
    <div className={classNames('league-group', className)}>
      <Section heading={groupName}>
        <div className="info mb-4">{description && <p>{description}</p>}</div>
        <div className="row row-cols-1 row-cols-lg-2 g-4">
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
        {showMoreButton && (
          <Link to="/leagues">
            <Button variant="outline-success" className="mt-3">
              View all leagues
            </Button>
          </Link>
        )}
      </Section>
    </div>
  );
}
