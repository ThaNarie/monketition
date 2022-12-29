import { type League } from './League';

export type SportType = 'table-tennis' | 'pool' | 'foosball' | 'darts';
export type Sport = {
  type: SportType;
  name: string;
  leagues: Array<League>;
};
