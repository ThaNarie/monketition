import { faker } from '@faker-js/faker';
import { type League } from '../types/League';
import { getSportMock } from './Sport.mocks';

export function getLeagueMock(): Partial<League> {
  const name = faker.random.words(2);
  return {
    name,
    slug: faker.helpers.slugify(name),
    description: faker.random.words(10 + Math.round(Math.random() * 20)),
    playerCount: faker.datatype.number({ min: 10, max: 100 }),
    lastMatchPlayedAt: faker.date.past(1),
    sport: getSportMock(),
  };
}
