type StreakInfoProps = {
  streak: number;
  range?: number;
  iconSize?: 18 | 24 | 36 | 48;
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
      {streak > 0 && (
        <span className={`material-symbols-outlined text-danger md-${iconSize}`}>
          local_fire_department
        </span>
      )}
      {streak < 0 && (
        <span className={`material-symbols-outlined text-primary md-${iconSize}`}>ac_unit</span>
      )}
      {!reverse && ` ${label}`}
    </span>
  );
}
