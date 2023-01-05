import { type Participant } from '../../types/Participant';

export type OpponentRecordInfo = {
  games: number;
  wins: number;
  losses: number;
  winRatio: number;
  loseRatio: number;
};

export function getOpponentRecords(participant: Pick<Participant, 'matches'>): {
  mostPlayedAgainst: OpponentRecordInfo & { participant: Participant };
  mostWonAgainst: OpponentRecordInfo & { participant: Participant };
  mostLostAgainst: OpponentRecordInfo & { participant: Participant };
} {
  const opponents = new Map<Participant, OpponentRecordInfo>();
  for (const match of participant.matches) {
    const opponent = match.participants.find((p) => p !== participant);
    if (opponent) {
      const opponentStats = opponents.get(opponent) ?? {
        games: 0,
        wins: 0,
        losses: 0,
        winRatio: 0,
        loseRatio: 0,
      };
      opponentStats.games += 1;
      if (match.winner === participant) {
        opponentStats.wins += 1;
      } else if (match.loser === participant) {
        opponentStats.losses += 1;
      }
      opponentStats.winRatio = opponentStats.wins / opponentStats.games;
      opponentStats.loseRatio = opponentStats.losses / opponentStats.games;
      opponents.set(opponent, opponentStats);
    }
  }
  const [mostPlayedAgainst] = [...opponents.entries()].sort(([, a], [, b]) => b.games - a.games);
  const [mostWonAgainst] = [...opponents.entries()].sort(([, a], [, b]) => b.winRatio - a.winRatio);
  const [mostLostAgainst] = [...opponents.entries()].sort(
    ([, a], [, b]) => b.loseRatio - a.loseRatio,
  );
  return {
    mostPlayedAgainst: {
      participant: mostPlayedAgainst[0],
      ...mostPlayedAgainst[1],
    },
    mostWonAgainst: {
      participant: mostWonAgainst[0],
      ...mostWonAgainst[1],
    },
    mostLostAgainst: {
      participant: mostLostAgainst[0],
      ...mostLostAgainst[1],
    },
  };
}
