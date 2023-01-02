import { faker } from '@faker-js/faker';
import { type League, type LeagueType } from '../types/League';
import { type SportType } from '../types/Sport';
import { getMockMatch } from './Match.mocks';
import { getMockResult } from './Result.mocks';
import { getMockSport } from './Sport.mocks';

type LeagueStatus = 'upcoming' | 'ongoing' | 'finished' | undefined;

type MockOptions = {
  sportType?: SportType;
  status?: LeagueStatus;
};

const getStartEndAt = (status: LeagueStatus, duration = 90): { startAt?: Date; endAt?: Date } => {
  const closeToNow = Math.round(duration * 0.2);

  if (status === 'upcoming') {
    const startAt = faker.date.soon(closeToNow);
    return { startAt, endAt: faker.date.soon(duration, startAt) };
  }

  if (status === 'ongoing' || !status) {
    return { startAt: faker.date.recent(duration / 2), endAt: faker.date.soon(duration / 2) };
  }

  // finished
  const endAt = faker.date.recent(closeToNow);
  return { startAt: faker.date.recent(duration, endAt), endAt };
};
const getDates = (status: LeagueStatus, type?: LeagueType): { startAt?: Date; endAt?: Date } => {
  if (type === 'season') {
    return getStartEndAt(status, 90);
  }
  if (type === 'tournament') {
    return getStartEndAt(status, 5);
  }
  if (type === 'continuous') {
    return {
      startAt: status === 'upcoming' ? faker.date.soon(10) : faker.date.past(2),
      endAt: undefined,
    };
  }
  return {
    startAt: undefined,
    endAt: undefined,
  };
};

export function getMockLeague(
  fields: Partial<League> = {},
  { sportType, status }: MockOptions = {},
): League {
  const league = {} as League;
  const name = faker.random.words(2);
  const matches =
    Math.random() > 0.8
      ? []
      : [
          getMockMatch({ league }),
          getMockMatch({ league }),
          getMockMatch({ league }, { recent: true }),
        ].sort((a, b) => a.playedAt.getTime() - b.playedAt.getTime());
  // eslint-disable-next-line no-param-reassign
  const type = fields.type ?? faker.helpers.arrayElement(['continuous', 'season', 'tournament']);

  const { startAt, endAt } = getDates(status, type);

  return {
    id: faker.datatype.uuid(),
    name,
    slug: faker.helpers.slugify(name),
    description: faker.random.words(10 + Math.round(Math.random() * 20)),
    playerCount: faker.datatype.number({ min: 10, max: 100 }),
    sport: getMockSport({ type: sportType }),
    type,
    office: faker.helpers.arrayElement([
      'hilversum',
      'amsterdam',
      'london',
      'new-york',
      'buenos-aires',
    ]),
    matches,
    lastMatch: matches.at(-1),
    startAt,
    endAt,
    results: Array.from({ length: Math.round(Math.random() * 50) }, (_, index) =>
      getMockResult({ rank: index + 1 }),
    ),
  };
}
