/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import { getMockLeague } from '../mocks/Leage.mocks';
import { getMockMatch } from '../mocks/Match.mocks';
import { findMockParticipant, updateStreakHistory } from '../mocks/Participant.mocks';
import { getMockUser } from '../mocks/User.mocks';
import { type Match } from '../types/Match';

/* eslint-disable @typescript-eslint/naming-convention */
const USER_COUNT = 20;
const LEAGUE_COUNT = 2;
const MATCH_COUNT = 300;
const USER_ROUNDS = 5;
/* eslint-enable @typescript-eslint/naming-convention */

// bare users
export const users = Array.from({ length: USER_COUNT }, () => getMockUser({ bare: true }));
console.group('mock data');
console.log('users', users);
console.log('me', users[0]);
export const leagues = Array.from({ length: LEAGUE_COUNT }, () => getMockLeague({ bare: true }));
console.log('leagues', leagues);

// list of all matches played
export const matches: Array<Match> = [];
const matchDates = Array.from({ length: MATCH_COUNT }, () => faker.date.recent(90)).sort(
  (a, b) => a.getTime() - b.getTime(),
);

function playMatch(userIndex: number): void {
  const league = leagues[Math.floor(Math.random() * leagues.length)];
  const user = users[userIndex];
  // console.log('user', user.name);

  const player = findMockParticipant({ forLeague: league, user });
  const opponent = findMockParticipant({ forLeague: league, excludeUser: user });

  const match = getMockMatch({
    fields: { league, playedAt: matchDates.shift() },
    player1: player,
    player2: opponent,
  });

  // if (player.user === users[0] || opponent.user === users[0]) {
  //   console.log('');
  //   console.group(' >> match', player.user.name, '-', opponent.user.name);
  //   console.log(match);
  //   console.groupEnd();
  // }
  matches.push(match);
}

console.group('Play Matches');
// let every player play at least some matches in one of the leagues
// this lets us have a nice distribution of matches for each player and league
for (let index = 0; index < USER_ROUNDS; index++) {
  for (let userIndex = 0; userIndex < users.length; userIndex++) {
    if (matchDates.length === 0) {
      console.log('No more match dates');
    }
    playMatch(userIndex);
  }
}

// het the first 10 users play out the rest of the matches
while (matchDates.length > 0) {
  playMatch(Math.floor(Math.random() * Math.min(users.length, 10)));
}

console.groupEnd();

// loop over participants for all users and recalculate their streak info
for (const user of users) {
  for (const participant of user.participants) {
    updateStreakHistory(participant);
  }
}

console.log('matches', matches);

console.log('participants', users[0].participants);

console.groupEnd();
