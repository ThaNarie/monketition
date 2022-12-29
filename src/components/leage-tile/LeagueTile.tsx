import classNames from 'clsx';
import { Link } from 'react-router-dom';
import foosballIcon from '../../sports/foosball.svg';
import poolIcon from '../../sports/pool.svg';
import tableTennisIcon from '../../sports/table-tennis.svg';
import { type League } from '../../types/League';
import { type SportType } from '../../types/Sport';
import './leage-tile.css';
import { StatItem } from './components/StatItem';

const icons: Partial<Record<SportType, string>> = {
  pool: poolIcon,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'table-tennis': tableTennisIcon,
  foosball: foosballIcon,
};

type LeagueTileProps = Partial<League> & { className?: string };

export function LeagueTile({
  slug,
  name,
  description,
  sport,
  playerCount,
  className,
}: LeagueTileProps): JSX.Element {
  return (
    <div className={classNames('league-tile', 'card', className)} data-sport-type={sport?.type}>
      {sport && <img className="sport-logo" src={icons[sport.type]} alt={name} />}
      <div className="card-body">
        <Link to={`/leages/${slug}`}>
          <h4 style={{ display: 'inline-block' }}>{name}</h4>
        </Link>
        <p className="card-text description">{description}</p>
      </div>
      <div className="card-footer text-muted">
        <div className="stats">
          <div className="player-stats">
            <StatItem icon="group" label={`${playerCount}`} tooltip="Player count in league" />
            <StatItem icon="person" label="John Doe" tooltip="Top player in league" />
          </div>
          <div className="schedule-stats">
            <StatItem icon="schedule" label="3 days ago" tooltip="Last match played on Dec 24th" />
            <StatItem
              icon="calendar_month"
              label="13 days to go"
              tooltip="League ends on Feb 7th"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
