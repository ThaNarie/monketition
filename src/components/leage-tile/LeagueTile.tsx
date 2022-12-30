import classNames from 'clsx';
import { Link } from 'react-router-dom';
import foosballIcon from '../../sports/foosball.svg';
import poolIcon from '../../sports/pool.svg';
import tableTennisIcon from '../../sports/table-tennis.svg';
import { type League, type LeagueType } from '../../types/League';
import { type SportType } from '../../types/Sport';
import { ActivityChart } from './components/ActivityChart';
import { Stats } from './components/Stats';
import './leage-tile.scss';

const sportIcons: Partial<Record<SportType, string>> = {
  pool: poolIcon,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'table-tennis': tableTennisIcon,
  foosball: foosballIcon,
};

const leagueIcons: Partial<Record<LeagueType, string>> = {
  continuous: 'tools_ladder',
  season: 'calendar_month',
  tournament: 'family_history',
};

type LeagueTileProps = Partial<League> & { className?: string };

// TODO:
//  - your rank in the league, if you participate
export function LeagueTile({
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
}: LeagueTileProps): JSX.Element {
  return (
    <div className={classNames('league-tile', 'card', className)} data-sport-type={sport?.type}>
      <div className="card-body">
        {sport && <img className="sport-logo" src={sportIcons[sport.type]} alt={name} />}
        <Link to={`/leagues/${slug}`}>
          <h4 style={{ display: 'inline-block' }}>
            {type && (
              <>
                <span className="material-symbols-outlined">{leagueIcons[type]}</span>{' '}
              </>
            )}
            {name}
          </h4>
        </Link>
        {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
        <div className={classNames('office', { 'my-office': office === 'hilversum' })}>
          <span className="badge text-bg-dark">{office}</span>
        </div>
        <p className="card-text description">{description}</p>
        <div className="chart">
          <ActivityChart />
        </div>
      </div>
      <div className="card-footer text-muted">
        <Stats endAt={endAt} lastMatch={lastMatch} results={results} />
      </div>
    </div>
  );
}
