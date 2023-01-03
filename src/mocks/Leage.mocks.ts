import { faker } from '@faker-js/faker';
import { type League, type LeagueType } from '../types/League';
import { type Match } from '../types/Match';
import { type Result } from '../types/Result';
import { type SportType } from '../types/Sport';
import { calculateNewRatings } from '../utils/calculateNewRatings';
import { getMockMatch } from './Match.mocks';
import { getMockResult } from './Result.mocks';
import { getMockSport } from './Sport.mocks';

const getStartEndAt = (status: LeagueStatus, duration = 90): { startAt?: Date; endAt?: Date } => {
  const closeToNow = Math.round(duration * 0.2);

  if (status === 'upcoming') {
    const startAt = faker.date.soon(closeToNow);
    return { startAt, endAt: faker.date.soon(duration, startAt) };
  }

  if (status === 'ongoing' || !status) {
    return { startAt: faker.date.recent(duration / 2), endAt: faker.date.soon(duration / 2) };
  }

  // finished
  const endAt = faker.date.recent(closeToNow);
  return { startAt: faker.date.recent(duration, endAt), endAt };
};
const getDates = (status: LeagueStatus, type?: LeagueType): { startAt?: Date; endAt?: Date } => {
  if (type === 'season') {
    return getStartEndAt(status, 90);
  }
  if (type === 'tournament') {
    return getStartEndAt(status, 5);
  }
  if (type === 'continuous') {
    return {
      startAt: status === 'upcoming' ? faker.date.soon(10) : faker.date.past(2),
      endAt: undefined,
    };
  }
  return {
    startAt: undefined,
    endAt: undefined,
  };
};

type LeagueStatus = 'upcoming' | 'ongoing' | 'finished' | undefined;

type MockOptions = {
  bare?: boolean;
  fields?: Partial<League>;
  sportType?: SportType;
  status?: LeagueStatus;
};

export function getMockLeague({ bare, fields = {}, sportType, status }: MockOptions = {}): League {
  const name = faker.random.words(2);

  // eslint-disable-next-line no-param-reassign
  const type = fields.type ?? faker.helpers.arrayElement(['continuous', 'season', 'tournament']);

  const { startAt, endAt } = getDates(status, type);

  const league: League = {
    id: faker.datatype.uuid(),
    name,
    slug: faker.helpers.slugify(name),
    description: faker.random.words(10 + Math.round(Math.random() * 20)),
    // todo, reflect result count
    playerCount: faker.datatype.number({ min: 10, max: 100 }),
    sport: getMockSport({ type: sportType }),
    type,
    office: faker.helpers.arrayElement([
      'hilversum',
      'amsterdam',
      'london',
      'new-york',
      'buenos-aires',
    ]),
    startAt,
    endAt,
    // add below
    matches: [],
    lastMatch: undefined,
    results: [],
  };

  if (!bare) {
    league.matches =
      fields.matches ?? Math.random() > 0.8
        ? []
        : [
            getMockMatch({ fields: { league } }),
            getMockMatch({ fields: { league } }),
            getMockMatch({ fields: { league }, recent: true }),
          ].sort((a, b) => a.playedAt.getTime() - b.playedAt.getTime());
    league.lastMatch = league.matches.at(-1);
  }

  // TODO: results don't reflect played matches yet
  if (!bare) {
    league.results =
      fields.results ??
      Array.from({ length: Math.round(Math.random() * 50) }, (_, index) =>
        getMockResult({ fields: { rank: index + 1 }, forLeague: league }),
      );
  }

  return league;
}

export function updateLeagueResults(league: League, match: Match): void {
  const { participants, winner, loser, eloInfo } = match;
  const { results = [] } = league;
  const currentParticipantResults = participants.map((participant) => {
    const result = results.find((r) => r.participant.id === participant.id);
    if (result) {
      return result;
    }
    const newResult = getMockResult({ fields: { participant }, forLeague: league });
    results.push(newResult);
    return newResult;
  });

  const winnerResult = currentParticipantResults.find((r) => r.participant.id === winner.id)!;
  const loserResult = currentParticipantResults.find((r) => r.participant.id === loser.id)!;

  winnerResult.score = eloInfo.find((r) => r.participant.id === winner.id)!.newScore;
  loserResult.score = eloInfo.find((r) => r.participant.id === loser.id)!.newScore;

  results.sort((a, b) => b.score - a.score);
  for (const [index, result] of results.entries()) {
    result.rank = index + 1;
  }
}
