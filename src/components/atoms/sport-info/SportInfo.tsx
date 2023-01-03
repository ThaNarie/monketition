import { startCase } from 'lodash-es';
import { type Sport } from '../../../types/Sport';
import { sportIcons } from '../../league/leage-tile/LeagueTile';
import './sport-info.scss';

type SportInfoProps = {
  sport: Sport;
};

export function SportInfo({ sport }: SportInfoProps): JSX.Element {
  return (
    <div className="sport-info">
      <img className="sport-logo" src={sportIcons[sport.type]} alt={sport.name} />{' '}
      {startCase(sport.name)}
    </div>
  );
}
