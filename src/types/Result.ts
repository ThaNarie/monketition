import { type Participant } from './Participant';

export type Result = {
  id: string;
  participant: Participant;
  rank: number;
  score: number;
};
