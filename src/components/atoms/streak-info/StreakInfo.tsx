import { Icon, type IconProps } from '../icon/Icon';

type StreakInfoProps = {
  streak: number;
  range?: number;
  iconSize?: IconProps['size'];
  reverse?: boolean;
};

export function StreakInfo({
  streak,
  range = 0,
  iconSize = 24,
  reverse = false,
}: StreakInfoProps): JSX.Element | null {
  const showStreak = Math.abs(streak) > range;
  if (!showStreak) {
    return null;
  }
  const label = Math.abs(streak);
  return (
    <span className="streak-info">
      {reverse && `${label} `}
      {streak > 0 && <Icon icon="local_fire_department" className="text-danger" size={iconSize} />}
      {streak < 0 && <Icon icon="ac_unit" className="text-primary" size={iconSize} />}
      {!reverse && ` ${label}`}
    </span>
  );
}
