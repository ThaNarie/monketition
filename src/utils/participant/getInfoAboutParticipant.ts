import { type Match } from '../../types/Match';
import { type Participant } from '../../types/Participant';
import { type User } from '../../types/User';

export type OpponentRecordInfo = {
  games: number;
  wins: number;
  losses: number;
  winRatio: number;
  loseRatio: number;
  matches: Array<Match>;
};

export type ParticipantOpponentInfo = {
  opponents: Map<Participant, OpponentRecordInfo>;
  mostPlayedAgainst: OpponentRecordInfo & { opponent: Participant };
  mostWonAgainst: OpponentRecordInfo & { opponent: Participant };
  mostLostAgainst: OpponentRecordInfo & { opponent: Participant };
  gamesWon: number;
  gamesLost: number;
};

const participantStore = new WeakMap<Pick<Participant, 'matches'>, ParticipantOpponentInfo>();

function getMostPlayed<T>(
  opponents: Map<T, OpponentRecordInfo>,
  field: keyof Omit<OpponentRecordInfo, 'matches'>,
): OpponentRecordInfo & { opponent: T } {
  const info = [...opponents.entries()].sort(([, a], [, b]) => b[field] - a[field]).at(0)!;
  return {
    opponent: info[0],
    ...info[1],
  };
}

/**
 * Get all matches for a participant, grouped in a Map by opponent.
 * @param participant
 */
export function getInfoAboutParticipant(
  participant: Pick<Participant, 'matches'>,
): ParticipantOpponentInfo {
  if (participantStore.has(participant)) {
    return participantStore.get(participant)!;
  }
  let gamesWon = 0;
  let gamesLost = 0;

  const opponents = new Map<Participant, OpponentRecordInfo>();
  for (const match of participant.matches) {
    const opponent = match.participants.find((p) => p !== participant);
    if (opponent) {
      const opponentInfo = opponents.get(opponent) ?? {
        games: 0,
        wins: 0,
        losses: 0,
        winRatio: 0,
        loseRatio: 0,
        matches: [],
      };
      opponentInfo.games += 1;
      if (match.winner === participant) {
        gamesWon += 1;
        opponentInfo.wins += 1;
      } else if (match.loser === participant) {
        gamesLost += 1;
        opponentInfo.losses += 1;
      }
      opponentInfo.winRatio = opponentInfo.wins / opponentInfo.games;
      opponentInfo.loseRatio = opponentInfo.losses / opponentInfo.games;
      opponentInfo.matches.push(match);
      opponents.set(opponent, opponentInfo);
    }
  }
  const mostPlayedAgainst = getMostPlayed(opponents, 'games');
  const mostWonAgainst = getMostPlayed(opponents, 'winRatio');
  const mostLostAgainst = getMostPlayed(opponents, 'loseRatio');

  const participantOpponentInfo = {
    opponents,
    mostPlayedAgainst,
    mostWonAgainst,
    mostLostAgainst,
    gamesWon,
    gamesLost,
  };

  participantStore.set(participant, participantOpponentInfo);

  return participantOpponentInfo;
}

export type UserOpponentInfo = {
  opponents: Map<User, OpponentRecordInfo>;
  mostPlayedAgainst: OpponentRecordInfo & { opponent: User };
  mostWonAgainst: OpponentRecordInfo & { opponent: User };
  mostLostAgainst: OpponentRecordInfo & { opponent: User };
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  winRatio: number;
  loseRatio: number;
};
const userStore = new WeakMap<User, UserOpponentInfo>();

export function getInfoAboutUser(user: User): UserOpponentInfo {
  if (userStore.has(user)) {
    return userStore.get(user)!;
  }

  let gamesPlayed = 0;
  let gamesWon = 0;
  let gamesLost = 0;

  const opponents = new Map<User, OpponentRecordInfo>();
  for (const participant of user.participants) {
    const info = getInfoAboutParticipant(participant);
    gamesWon += info.gamesWon;
    gamesLost += info.gamesLost;
    gamesPlayed += participant.matches.length;

    for (const [opponent, opponentInfo] of info.opponents) {
      const opponentRecordInfo = opponents.get(opponent.user) ?? {
        games: 0,
        wins: 0,
        losses: 0,
        winRatio: 0,
        loseRatio: 0,
        matches: [],
      };
      opponentRecordInfo.games += opponentInfo.games;
      opponentRecordInfo.wins += opponentInfo.wins;
      opponentRecordInfo.losses += opponentInfo.losses;
      opponentRecordInfo.winRatio = opponentRecordInfo.wins / opponentRecordInfo.games;
      opponentRecordInfo.loseRatio = opponentRecordInfo.losses / opponentRecordInfo.games;
      opponentRecordInfo.matches.push(...opponentInfo.matches);
      opponents.set(opponent.user, opponentRecordInfo);
    }
  }

  const mostPlayedAgainst = getMostPlayed(opponents, 'games');
  const mostWonAgainst = getMostPlayed(opponents, 'winRatio');
  const mostLostAgainst = getMostPlayed(opponents, 'loseRatio');

  const userOpponentInfo = {
    opponents,
    mostPlayedAgainst,
    mostWonAgainst,
    mostLostAgainst,
    gamesWon,
    gamesLost,
    gamesPlayed,
    winRatio: gamesWon / gamesPlayed,
    loseRatio: gamesLost / gamesPlayed,
  };

  userStore.set(user, userOpponentInfo);

  return userOpponentInfo;
}
