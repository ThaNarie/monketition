import { type Participant } from './Participant';

export type MatchScoreInfo = { participant: Participant; score: number };

export type Match = {
  id: string;
  playedAt: Date;
  participants: Array<Participant>;
  winner: Participant;
  gameScore: Array<MatchScoreInfo>;
  setScores: Array<Array<MatchScoreInfo>>;
};
