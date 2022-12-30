import { type OfficeLocation } from './League';

export type Participant = {
  name: string;
  office: OfficeLocation;
  jobType: string;
  streak: number;
};
