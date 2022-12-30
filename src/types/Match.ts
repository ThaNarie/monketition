import { type Participant } from './Participant';

export type Match = {
  id: string;
  playedAt: Date;
  participants: Array<Participant>;
  winner: Participant;
};
