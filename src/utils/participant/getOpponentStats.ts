import { type Participant } from '../../types/Participant';
import { getInfoAboutParticipant, type OpponentRecordInfo } from './getInfoAboutParticipant';

export function getOpponentStats(
  participant: Pick<Participant, 'matches'>,
  opponent: Participant,
): OpponentRecordInfo {
  // improve the code below by using the getInfoAboutParticipant function
  return (
    getInfoAboutParticipant(participant).opponents.get(opponent) ?? {
      games: 0,
      wins: 0,
      losses: 0,
      winRatio: 0,
      loseRatio: 0,
      matches: [],
    }
  );
}
