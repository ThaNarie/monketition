import { startCase } from 'lodash-es';
import { type Sport } from '../../../types/Sport';
import './sport-info.scss';
import { Icon } from '../icon/Icon';

type SportInfoProps = {
  sport: Sport;
};

export function SportInfo({ sport }: SportInfoProps): JSX.Element {
  return (
    <div className="sport-info">
      <Icon icon={sport.type} className="sport-logo" />
      {startCase(sport.name)}
    </div>
  );
}
