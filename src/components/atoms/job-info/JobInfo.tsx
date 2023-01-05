import './job-info.scss';
import { type User } from '../../../types/User';
import { Icon } from '../icon/Icon';

type OfficeInfoProps = {
  jobType?: User['jobType'];
  hideIcon?: boolean;
};

export function JobInfo({ jobType, hideIcon }: OfficeInfoProps): JSX.Element | null {
  return jobType ? (
    <div className="job-info">
      {!hideIcon && <Icon className="job-icon" icon="work" size={18} />}
      {jobType}
    </div>
  ) : null;
}
