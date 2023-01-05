import classNames from 'clsx';
import { Link } from 'react-router-dom';
import { type User } from '../../../types/User';
import { Avatar } from '../../atoms/avatar/Avatar';
import { JobInfo } from '../../atoms/job-info/JobInfo';
import { OfficeInfo } from '../../atoms/office-info/OfficeInfo';
import styles from './user-info.module.scss';

type Variants = 'large' | 'medium' | 'small';

type UserInfoProps = {
  className?: string;
  user: User;
  variant: Variants;
  hideOffice?: boolean;
  hideJob?: boolean;
  hideIcons?: boolean;
};

const headingSizes: Record<Variants, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
  large: 'h1',
  medium: 'h5',
  small: 'h6',
};

export function UserInfo({
  className,
  user,
  variant = 'large',
  hideJob = false,
  hideOffice = false,
  hideIcons = false,
}: UserInfoProps): JSX.Element {
  const HeadingTag = headingSizes[variant];
  const InfoWrapper = variant === 'small' ? 'small' : 'div';
  const iconsAreHidden = hideIcons || variant === 'small';
  return (
    <div
      className={classNames(styles.userInfo, className, styles[`variant-${variant}`], {
        [styles.iconsHidden]: iconsAreHidden,
      })}
    >
      <div className={styles.avatar}>
        <Link to={`/profile/${user.id}`}>
          <Avatar user={user} size={64} className="" />
        </Link>
      </div>
      <Link to={`/profile/${user.id}`}>
        <HeadingTag className={styles.heading}>{user.name}</HeadingTag>
      </Link>
      <InfoWrapper className={styles.info}>
        {!hideOffice && <OfficeInfo office={user.office} hideIcon={iconsAreHidden} />}
        {!hideOffice && !hideJob ? (iconsAreHidden ? '–' : ' ') : ''}
        {!hideJob && <JobInfo jobType={user.jobType} hideIcon={iconsAreHidden} />}
      </InfoWrapper>
    </div>
  );
}
