import { startCase } from 'lodash-es';
import { type OfficeLocation } from '../../../types/League';
import './office-info.scss';
import { Icon } from '../icon/Icon';

type OfficeInfoProps = {
  office?: OfficeLocation;
  hideIcon?: boolean;
};

export function OfficeInfo({ office, hideIcon = false }: OfficeInfoProps): JSX.Element | null {
  return office ? (
    <div className="office-info">
      {!hideIcon && <Icon icon="apartment" className="office-icon" size={18} />}
      {startCase(office)}
    </div>
  ) : null;
}
