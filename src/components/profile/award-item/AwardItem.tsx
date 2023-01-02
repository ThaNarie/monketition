import classNames from 'clsx';
import { type Sport } from '../../../types/Sport';
import { sportIcons } from '../../league/leage-tile/LeagueTile';
import './award-item.scss';

type AwardItemProps = {
  sport?: Sport;
  type: string;
  amount: number;
  achieved?: boolean;
};
export function AwardItem({ type, amount, sport, achieved }: AwardItemProps): JSX.Element {
  return (
    <div className={classNames('award-item', { achieved })}>
      {sport && <img className="sport-logo" src={sportIcons[sport.type]} alt={sport.type} />}
      <div className="award-item-title">{type}</div>
      <div className="award-item-amount">{amount}</div>
    </div>
  );
}
