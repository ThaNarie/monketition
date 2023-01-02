import { type OfficeLocation } from '../../../types/League';
import './office-info.scss';

type OfficeInfoProps = {
  office?: OfficeLocation;
};

export function OfficeInfo({ office }: OfficeInfoProps): JSX.Element | null {
  return office ? (
    <div className="office-info">
      <span className="material-symbols-outlined md-18">apartment</span> {office}
    </div>
  ) : null;
}
