import { type OfficeLocation } from '../../../types/League';
import './office-info.scss';

type OfficeInfoProps = {
  office: OfficeLocation;
};

export function OfficeInfo({ office }: OfficeInfoProps): JSX.Element {
  return (
    <div className="office-info">
      <span className="material-symbols-outlined md-18">apartment</span> {office}
    </div>
  );
}
