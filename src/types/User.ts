import { type OfficeLocation } from './League';
import { type Participant } from './Participant';

export type User = {
  id: string;
  name: string;
  office: OfficeLocation;
  jobType: string;
  participants: Array<Participant>;
};
