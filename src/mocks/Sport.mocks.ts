import { faker } from '@faker-js/faker';
import { type Sport } from '../types/Sport';

export function getMockSport(fields: Partial<Sport>): Sport {
  const type =
    fields.type ?? faker.helpers.arrayElement(['table-tennis', 'pool', 'foosball'] as const);
  return {
    name: type,
    type,
    leagues: [],
  };
}
