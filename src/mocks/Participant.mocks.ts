/* eslint-disable @typescript-eslint/ban-types,no-empty-pattern */
import { faker } from '@faker-js/faker';
import { type Participant } from '../types/Participant';

type MockOptions = {};

export function getMockParticipant(
  {}: MockOptions = {},
  fields: Partial<Participant> = {},
): Participant {
  return {
    name: faker.name.fullName(),
    office: faker.helpers.arrayElement([
      'hilversum',
      'amsterdam',
      'london',
      'new-york',
      'buenos-aires',
    ]),
    jobType: faker.name.jobTitle(),
    currentStreak:
      fields.currentStreak ??
      Math.ceil(faker.datatype.number({ max: 10, precision: 0.0001 }) ** 4 / 1000) *
        (Math.random() > 0.5 ? 1 : -1),
    bestStreak: fields.bestStreak ?? 1 + faker.datatype.number(10),
    worstStreak: fields.worstStreak ?? -1 - faker.datatype.number(10),
  };
}
