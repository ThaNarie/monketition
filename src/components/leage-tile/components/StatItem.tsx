import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

type StatItemProps = {
  icon: string;
  label: string;
  tooltip?: string;
};
export function StatItem({ icon, label, tooltip }: StatItemProps): JSX.Element {
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 500, hide: 0 }}
      overlay={<Tooltip id="tooltip-top">{tooltip}</Tooltip>}
    >
      <div>
        <small>
          <span className="material-symbols-outlined">{icon}</span> {label}
        </small>
      </div>
    </OverlayTrigger>
  );
}
