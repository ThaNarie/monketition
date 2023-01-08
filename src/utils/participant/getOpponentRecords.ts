import { type Participant } from '../../types/Participant';
import { type User } from '../../types/User';
import {
  getInfoAboutParticipant,
  getInfoAboutUser,
  type ParticipantOpponentInfo,
  type UserOpponentInfo,
} from './getInfoAboutParticipant';

export function getOpponentRecords(
  participant: Pick<Participant, 'matches'>,
): Pick<ParticipantOpponentInfo, 'mostWonAgainst' | 'mostLostAgainst' | 'mostPlayedAgainst'> {
  const info = getInfoAboutParticipant(participant);

  return {
    mostPlayedAgainst: info.mostPlayedAgainst,
    mostWonAgainst: info.mostWonAgainst,
    mostLostAgainst: info.mostLostAgainst,
  };
}

export function getOpponentRecordsForUser(
  user: User,
): Pick<UserOpponentInfo, 'mostWonAgainst' | 'mostLostAgainst' | 'mostPlayedAgainst'> {
  const info = getInfoAboutUser(user);

  return {
    mostPlayedAgainst: info.mostPlayedAgainst,
    mostWonAgainst: info.mostWonAgainst,
    mostLostAgainst: info.mostLostAgainst,
  };
}
