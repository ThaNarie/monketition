import { faker } from '@faker-js/faker';
import { type Match } from '../types/Match';
import { getMockParticipant } from './Participant.mocks';

export function getMockMatch(recent = false): Match {
  const participants = [getMockParticipant(), getMockParticipant()];
  return {
    id: faker.datatype.uuid(),
    participants,
    winner: participants[0],
    playedAt: recent ? faker.date.recent(3) : faker.date.past(1),
  };
}
