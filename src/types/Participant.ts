import { type League, type OfficeLocation } from './League';
import { type Match } from './Match';
import { type User } from './User';

export type Participant = {
  id: string;
  user: User;
  currentStreak: number;
  bestStreak: number;
  worstStreak: number;
  matches: Array<Match>;
  league: League;
  eloScore: number;
};
