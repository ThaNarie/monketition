/* eslint-disable @typescript-eslint/naming-convention */
import classNames from 'clsx';
import { Link } from 'react-router-dom';
import { useUser } from '../../../../data/me';
import { type Participant } from '../../../../types/Participant';

type ParticipantNameProps = {
  participant: Participant;
  isWinner: boolean;
};
export function ParticipantName({ participant, isWinner }: ParticipantNameProps): JSX.Element {
  const me = useUser();

  return (
    <div
      className={classNames('participant', isWinner ? 'winner' : 'loser', {
        'is-me': participant.user.id === me.id,
      })}
    >
      <Link to={`/profile/${participant.user.id}`}>
        <h5 className="name">{participant.user.name}</h5>
      </Link>
    </div>
  );
}
