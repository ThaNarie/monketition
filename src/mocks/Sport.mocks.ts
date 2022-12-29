import { faker } from '@faker-js/faker';
import { type Sport } from '../types/Sport';

export function getSportMock(): Sport {
  const type = faker.helpers.arrayElement(['table-tennis', 'pool', 'foosball'] as const);
  return {
    name: type,
    type,
    leagues: [],
  };
}
