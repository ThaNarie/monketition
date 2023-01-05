import classNames from 'clsx';
import { startCase } from 'lodash-es';
import { Link } from 'react-router-dom';
import { type League } from '../../../types/League';
import { Icon } from '../../atoms/icon/Icon';
import { LeagueTitle } from '../league-title/LeagueTitle';
import { ActivityChart } from './components/ActivityChart';
import { Stats } from './components/Stats';
import './leage-card.scss';

type LeagueCardProps = Partial<League> & { className?: string };

// TODO:
//  - your rank in the league, if you participate
export function LeagueCard({
  slug,
  type,
  name,
  description,
  sport,
  office,
  className,
  lastMatch,
  endAt,
  results,
  matches,
}: LeagueCardProps): JSX.Element {
  return (
    <div className={classNames('league-card', 'card', className)} data-sport-type={sport?.type}>
      <div className="card-body">
        {sport && <Icon icon={sport.type} className="sport-logo" />}
        <Link to={`/leagues/${slug}`}>
          <LeagueTitle as="h4" type={type}>
            {name}
          </LeagueTitle>
        </Link>
        {office && (
          // eslint-disable-next-line @typescript-eslint/naming-convention
          <div className={classNames('office', { 'my-office': office === 'hilversum' })}>
            <span className="badge text-bg-dark">{startCase(office)}</span>
          </div>
        )}
        <p className="card-text description">{description}</p>
        <div className="chart">
          <ActivityChart matches={matches ?? []} />
        </div>
      </div>
      <div className="card-footer text-muted">
        <Stats endAt={endAt} lastMatch={lastMatch} results={results} />
      </div>
    </div>
  );
}
