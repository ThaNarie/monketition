/* eslint-disable @typescript-eslint/ban-types,no-empty-pattern */
import { faker } from '@faker-js/faker';
import { users } from '../data/createMockData';
import { type League } from '../types/League';
import { type Participant } from '../types/Participant';
import { type User } from '../types/User';
import { getMockMatch } from './Match.mocks';
import { getMockUser } from './User.mocks';

type MockOptions = {
  bare?: boolean;
  fields?: Partial<Participant>;
  addMatches?: boolean;
};

export function getMockParticipant({
  bare = false,
  fields = {},
  addMatches = false,
}: MockOptions = {}): Participant {
  const participant: Participant = {
    id: faker.datatype.uuid(),
    currentStreak: bare
      ? 0
      : fields.currentStreak ??
        Math.ceil(faker.datatype.number({ max: 10, precision: 0.0001 }) ** 4 / 1000) *
          (Math.random() > 0.5 ? 1 : -1),
    bestStreak: bare ? 0 : fields.bestStreak ?? 1 + faker.datatype.number(10),
    worstStreak: bare ? 0 : fields.worstStreak ?? -1 - faker.datatype.number(10),
    matches: bare ? [] : fields.matches ?? [],
    eloScore: bare ? 1500 : fields.eloScore ?? faker.datatype.number({ min: 1000, max: 3000 }),
    user: fields.user ?? null!,
    league: fields.league ?? null!,
  };

  if (!fields.user) {
    participant.user = getMockUser({ fields: { participants: [participant] } });
  }

  if (addMatches) {
    participant.matches = Array.from({ length: faker.datatype.number({ min: 2, max: 5 }) }, () =>
      getMockMatch({ player1: participant }),
    );
  }
  return participant;
}

export function findMockParticipant({
  forLeague,
  user,
  excludeUser,
}: {
  forLeague: League;
  user?: User;
  excludeUser?: User;
}): Participant {
  // find a random user from the list that is not the excluded user
  let newUser = user ?? users[Math.floor(Math.random() * users.length)];
  if (excludeUser) {
    while (newUser === excludeUser) {
      newUser = users[Math.floor(Math.random() * users.length)];
    }
  }

  // see if that user already has a linked participant for the given league
  let participant = newUser.participants.find((p) => p.league.id === forLeague.id);

  // if not, create a new participant for that user
  if (!participant) {
    participant = getMockParticipant({ bare: true, fields: { user: newUser, league: forLeague } });
    newUser.participants.push(participant);
  }

  return participant;
}

export function updateStreakHistory(participant: Participant): void {
  let currentStreak = 0;
  let bestStreak = 0;
  let worstStreak = 0;
  let lastResult: 'win' | 'loss' | null = null;

  // console.groupCollapsed('updateStreakHistory - ', participant.user.name);

  for (const match of participant.matches) {
    const result = match.winner === participant ? 'win' : 'loss';
    // console.log('result', result);

    if (result !== lastResult) {
      currentStreak = 0;
    }

    currentStreak += result === 'win' ? 1 : -1;
    bestStreak = Math.max(bestStreak, currentStreak);
    worstStreak = Math.min(worstStreak, currentStreak);

    lastResult = result;
  }

  participant.currentStreak = currentStreak;
  participant.bestStreak = bestStreak;
  participant.worstStreak = worstStreak;

  // console.log({ currentStreak, bestStreak, worstStreak });
  // console.groupEnd();
}
