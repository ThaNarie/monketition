import { type Sport } from './Sport';

export type LeagueType = 'continuous' | 'season' | 'tournament';

export type League = {
  id: string;
  slug: string;
  name: string;
  type: LeagueType;
  sport: Sport;
  startAt: Date;
  endAt: Date;
  playerCount: number;
  lastMatchPlayedAt: Date;
  description: string;
  rules: string;
  // season: Season; // TODO back link to parent season holder
  // participants: Array<Participant>; // TODO links to participants
  // results: Array<Result>; // TODO links to results
  // matches: Array<Match>; // TODO links to matches
};
