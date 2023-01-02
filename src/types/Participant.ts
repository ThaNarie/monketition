import { type OfficeLocation } from './League';

export type Participant = {
  name: string;
  office: OfficeLocation;
  jobType: string;
  currentStreak: number;
  bestStreak: number;
  worstStreak: number;
};
