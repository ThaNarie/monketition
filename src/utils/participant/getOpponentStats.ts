import { type Participant } from '../../types/Participant';
import { type OpponentRecordInfo } from './getOpponentRecords';

export function getOpponentStats(
  participant: Pick<Participant, 'matches'>,
  opponent: Participant,
): OpponentRecordInfo {
  const opponentMatches = participant.matches.filter((m) => m.participants.includes(opponent));
  const stats = {
    games: opponentMatches.length,
    wins: 0,
    losses: 0,
    winRatio: 0,
    loseRatio: 0,
  };
  for (const match of opponentMatches) {
    if (match.winner === participant) {
      stats.wins += 1;
    } else if (match.loser === participant) {
      stats.losses += 1;
    }
  }
  stats.winRatio = stats.wins / stats.games;
  stats.loseRatio = stats.losses / stats.games;
  return stats;
}
