import { faker } from '@faker-js/faker';
import { type Match } from '../types/Match';
import { type Participant } from '../types/Participant';
import { getMockLeague } from './Leage.mocks';
import { getMockParticipant } from './Participant.mocks';

function playPoint(): 0 | 1 {
  return Math.round(Math.random()) as 0 | 1;
}

function playSet(): [number, number] {
  const score = [0, 0] as [number, number];
  while ((score[0] < 11 && score[1] < 11) || Math.abs(score[0] - score[1]) < 2) {
    score[playPoint()] += 1;
  }
  return score;
}

function playGame(bestOf = 3): {
  score: [number, number];
  winner: 0 | 1;
  sets: Array<[number, number]>;
} {
  const sets = [];
  const score = [0, 0] as [number, number];
  while (score[0] < bestOf / 2 && score[1] < bestOf / 2) {
    const set = playSet();
    sets.push(set);
    score[set[0] > set[1] ? 0 : 1] += 1;
  }

  return { winner: score[0] > score[1] ? 0 : 1, sets, score };
}

type MockOptions = {
  recent?: boolean;
  bestOf?: number;
  player1?: Participant;
};

export function getMockMatch(
  fields: Partial<Match> = {},
  { recent = false, bestOf = 5, player1 }: MockOptions = {},
): Match {
  const participants = [player1 ?? getMockParticipant(), getMockParticipant()];
  const league = fields.league ?? getMockLeague({}, { sportType: 'table-tennis' });

  // TODO: play a game that matches the `league.sport` rules
  const { winner, score, sets } = playGame(bestOf);

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

  const eloInfo = gameResult.map((result, index) => ({
    participant: result.participant,
    scoreBefore: 1000 + faker.datatype.number(2000),
    scoreChange: faker.datatype.number(30) * (index === winner ? 1 : -1),
  }));

  return {
    id: faker.datatype.uuid(),
    participants,
    winner: participants[winner],
    playedAt: recent ? faker.date.recent(3) : faker.date.past(1),
    setScores,
    gameScore: gameResult,
    league,
    eloInfo,
  };
}
