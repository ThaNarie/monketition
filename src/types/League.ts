import { type Match } from './Match';
import { type Participant } from './Participant';
import { type Result } from './Result';
import { type Sport } from './Sport';

export type LeagueType = 'continuous' | 'season' | 'tournament';
export type OfficeLocation = 'hilversum' | 'amsterdam' | 'london' | 'new-york' | 'buenos-aires';

export type League = {
  id: string;
  slug: string;
  name: string;
  type: LeagueType;
  sport: Sport;
  startAt?: Date;
  endAt?: Date;
  playerCount?: number;
  description?: string;
  rules?: string;
  // season: Season; // TODO back link to parent season holder
  results?: Array<Result>;
  matches: Array<Match>;
  lastMatch?: Match;
  office?: OfficeLocation;
};
