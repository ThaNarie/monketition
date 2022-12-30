/* eslint-disable @typescript-eslint/ban-types,no-empty-pattern */
import { faker } from '@faker-js/faker';
import { type Result } from '../types/Result';
import { getMockParticipant } from './Participant.mocks';

export function getMockResult(fields: Partial<Result> = {}): Result {
  const score =
    fields.score ??
    (fields.rank &&
      faker.datatype.number({
        min: 3000 - fields.rank * 100,
        max: 3000 - (fields.rank - 1) * 100,
      }));

  return {
    id: faker.datatype.uuid(),
    participant: getMockParticipant(),
    rank: fields.rank ?? faker.datatype.number(100),
    score: score ?? faker.datatype.number(3000),
  };
}
