import './job-info.scss';
import { type User } from '../../../types/User';
import { Icon } from '../icon/Icon';

type OfficeInfoProps = {
  jobType?: User['jobType'];
};

export function JobInfo({ jobType }: OfficeInfoProps): JSX.Element | null {
  return jobType ? (
    <div className="job-info">
      <Icon icon="work" size={18} /> {jobType}
    </div>
  ) : null;
}
