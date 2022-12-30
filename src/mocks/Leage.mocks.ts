import { faker } from '@faker-js/faker';
import { type League } from '../types/League';
import { type SportType } from '../types/Sport';
import { getMockMatch } from './Match.mocks';
import { getMockResult } from './Result.mocks';
import { getMockSport } from './Sport.mocks';

type MockOptions = {
  sportType?: SportType;
};

export function getMockLeague(
  fields: Partial<League> = {},
  { sportType }: MockOptions = {},
): Partial<League> {
  const name = faker.random.words(2);
  const matches =
    Math.random() > 0.8
      ? []
      : [getMockMatch(), getMockMatch(), getMockMatch(true)].sort(
          (a, b) => a.playedAt.getTime() - b.playedAt.getTime(),
        );
  // eslint-disable-next-line no-param-reassign
  const type = fields.type ?? faker.helpers.arrayElement(['continuous', 'season', 'tournament']);

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
    startAt: faker.date.past(1),
    endAt: type === 'continuous' ? undefined : faker.date.soon(90),
    results: Array.from({ length: Math.round(Math.random() * 50) }, (_, index) =>
      getMockResult({ rank: index + 1 }),
    ),
  };
}
