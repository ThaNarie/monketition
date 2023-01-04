import classNames from 'clsx';
import { type User } from '../../../types/User';
import './avatar.scss';

export type AvatarProps = {
  className?: string;
  user: User;
  size?: number;
  showName?: boolean;
};
export function Avatar({ className, user, size = 32, showName = false }: AvatarProps): JSX.Element {
  return (
    <img
      className={classNames('avatar', className)}
      alt={user.name}
      src={`https://i.pravatar.cc/${size}?u=${user.id}`}
    />
  );
}
