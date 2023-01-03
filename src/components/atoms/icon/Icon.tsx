export type IconProps = {
  className?: string;
  icon: string;
  size?: 18 | 24 | 36 | 48;
};
export function Icon({ icon, className, size = 24 }: IconProps): JSX.Element {
  return <span className={`material-symbols-outlined ${className} md-${size}`}>{icon}</span>;
}
