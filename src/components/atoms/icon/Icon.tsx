import classNames from 'clsx';
import foosballIcon from '../../../sports/foosball.svg';
import poolIcon from '../../../sports/pool.svg';
import tableTennisIcon from '../../../sports/table-tennis.svg';
import { type SportType } from '../../../types/Sport';
import styles from './icon.module.scss';

export const sportIcons: Partial<Record<SportType, string>> = {
  pool: poolIcon,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'table-tennis': tableTennisIcon,
  foosball: foosballIcon,
};

export type IconProps = {
  className?: string;
  icon: string;
  size?: 18 | 24 | 36 | 48;
};
export function Icon({ icon, className, size }: IconProps): JSX.Element {
  if (icon in sportIcons) {
    return (
      <img
        className={classNames(styles.sportIcon, className)}
        alt={`sport-icon-${icon}`}
        src={sportIcons[icon as keyof typeof sportIcons]}
        height={size}
      />
    );
  }
  return <span className={`material-symbols-outlined ${className} md-${size ?? 24}`}>{icon}</span>;
}
