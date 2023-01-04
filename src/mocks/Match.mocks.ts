import { faker } from '@faker-js/faker';
import { type Match } from '../types/Match';
import { type Participant } from '../types/Participant';
import { calculateNewRatings } from '../utils/calculateNewRatings';
import { getMockLeague, updateLeagueResults } from './Leage.mocks';
import { findMockParticipant } from './Participant.mocks';

// we use this to slightly influence our random game results
export function getExpectedWinRatio(playerRating: number, opponentRating: number): number {
  // used in elo calculation, this is what is expected
  const winChance = 1 / (1 + 10 ** ((opponentRating - playerRating) / 400));

  // we "dampen" the win chance to make it more realistic
  const useFactor = 0.1;
  return winChance * useFactor + (1 - useFactor) / 2;
}

function playPoint(winChance: number): 0 | 1 {
  return Math.random() < winChance ? 0 : 1;
}

function playSet(winChance: number): [number, number] {
  const score = [0, 0] as [number, number];
  while ((score[0] < 11 && score[1] < 11) || Math.abs(score[0] - score[1]) < 2) {
    score[playPoint(winChance)] += 1;
  }
  return score;
}

export function playGame(
  winChance: number,
  bestOf = 3,
): {
  score: [number, number];
  winnerIndex: 0 | 1;
  loserIndex: 0 | 1;
  sets: Array<[number, number]>;
} {
  const sets = [];
  const score = [0, 0] as [number, number];
  while (score[0] < bestOf / 2 && score[1] < bestOf / 2) {
    const set = playSet(winChance);
    sets.push(set);
    score[set[0] > set[1] ? 0 : 1] += 1;
  }

  return {
    winnerIndex: score[0] > score[1] ? 0 : 1,
    loserIndex: score[0] < score[1] ? 0 : 1,
    sets,
    score,
  };
}

type MockOptions = {
  fields?: Partial<Match>;
  recent?: boolean;
  bestOf?: number;
  player1?: Participant;
  player2?: Participant;
};

export function getMockMatch({
  fields = {},
  recent = false,
  bestOf = 5,
  player1,
  player2,
}: MockOptions = {}): Match {
  const league = fields.league ?? getMockLeague({ bare: true, sportType: 'table-tennis' });
  const participants = fields.participants ?? [
    player1 ?? findMockParticipant({ forLeague: league }),
    player2 ?? findMockParticipant({ forLeague: league }),
  ];

  const winChance = getExpectedWinRatio(participants[0].eloScore, participants[1].eloScore);

  // TODO: play a game that matches the `league.sport` rules
  const { winnerIndex, loserIndex, score, sets } = playGame(winChance, bestOf);
  const winner = participants[winnerIndex];
  const loser = participants[loserIndex];

  const setScores = sets.map((set) =>
    set.map((setScore, index) => ({
      participant: participants[index],
      score: setScore,
    })),
  );
  const gameResult = score.map((gameScore, index) => ({
    participant: participants[index],
    score: gameScore,
  }));

  const { newWinnerRating, newLoserRating } = calculateNewRatings(winner.eloScore, loser.eloScore);

  const eloInfo = gameResult.map((result, index) => ({
    participant: result.participant,
    scoreBefore: result.participant === winner ? winner.eloScore : loser.eloScore,
    newScore: result.participant === winner ? newWinnerRating : newLoserRating,
    scoreChange:
      result.participant === winner
        ? newWinnerRating - winner.eloScore
        : newLoserRating - loser.eloScore,
  }));

  winner.eloScore = newWinnerRating;
  loser.eloScore = newLoserRating;

  const match = {
    id: faker.datatype.uuid(),
    participants,
    winner,
    loser,
    playedAt: fields.playedAt ?? (recent ? faker.date.recent(3) : faker.date.past(1)),
    setScores,
    gameScore: gameResult,
    league,
    eloInfo,
  };

  // loop over participants, check if they don't have a different league set already
  // if another league is set, throw a descriptive error
  // and then assign the current league to them
  for (const participant of participants) {
    if (participant.league && participant.league !== league) {
      throw new Error(`Participant ${participant.user.name} already has a different league set`);
    }
    participant.league = league;

    // add the match to the participant's matches
    participant.matches.push(match);
  }

  league.matches.push(match);
  league.lastMatch = match;

  updateLeagueResults(league, match);

  return match;
}
