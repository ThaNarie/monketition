/* eslint-disable @typescript-eslint/ban-types,no-empty-pattern */
import { faker } from '@faker-js/faker';
import { type User } from '../types/User';
import { getMockParticipant } from './Participant.mocks';

type MockOptions = {
  bare?: boolean;
  fields?: Partial<User>;
};

export function getMockUser({ bare = false, fields = {} }: MockOptions = {}): User {
  const user: User = {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    office: faker.helpers.arrayElement([
      'hilversum',
      'amsterdam',
      'london',
      'new-york',
      'buenos-aires',
    ]),
    jobType: faker.name.jobTitle(),
    participants: fields.participants ?? [],
  };

  if (!bare && !fields.participants) {
    user.participants = Array.from({ length: faker.datatype.number({ min: 2, max: 5 }) }, () =>
      getMockParticipant({ fields: { user } }),
    );
  }

  return user;
}
