/* eslint-disable @typescript-eslint/ban-types,no-empty-pattern */
import { faker } from '@faker-js/faker';
import { type League } from '../types/League';
import { type Result } from '../types/Result';
import { getMockParticipant } from './Participant.mocks';

type MockOptions = {
  fields?: Partial<Result>;
  forLeague: League;
};
export function getMockResult({ fields = {}, forLeague }: MockOptions): Result {
  const score =
    fields.score ??
    (fields.rank &&
      faker.datatype.number({
        min: 3000 - fields.rank * 70,
        max: 3000 - (fields.rank - 1) * 70,
      }));

  return {
    id: faker.datatype.uuid(),
    participant: fields.participant ?? getMockParticipant({ fields: { league: forLeague } }),
    rank: fields.rank ?? faker.datatype.number(100),
    score: score ?? faker.datatype.number(3000),
  };
}
