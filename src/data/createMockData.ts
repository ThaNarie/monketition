/* eslint-disable no-console */
import { getMockLeague } from '../mocks/Leage.mocks';
import { getMockMatch } from '../mocks/Match.mocks';
import { findMockParticipant } from '../mocks/Participant.mocks';
import { getMockUser } from '../mocks/User.mocks';
import { type Match } from '../types/Match';

// bare users
export const users = Array.from({ length: 50 }, () => getMockUser({ bare: true }));
console.group('mock data');
console.log('users', users);
console.log('me', users[0]);
export const leagues = Array.from({ length: 5 }, () => getMockLeague({ bare: true }));
console.log('leagues', leagues);

// list of all matches played
export const matches: Array<Match> = [];

console.group('Play Matches');
// let every player play at least 3 matches in one of the leagues
for (let index = 0; index < 2; index++) {
  for (let userIndex = 0; userIndex < users.length; userIndex++) {
    const league = leagues[Math.floor(Math.random() * leagues.length)];
    const user = users[userIndex];
    // console.log('user', user.name);

    const player = findMockParticipant({ forLeague: league, user });
    const opponent = findMockParticipant({ forLeague: league, excludeUser: user });

    const match = getMockMatch({ fields: { league }, player1: player, player2: opponent });

    if (player.user === users[0] || opponent.user === users[0]) {
      console.log('');
      console.group(' >> match', player.user.name, '-', opponent.user.name);
      console.log(match);
      console.groupEnd();
    }
    matches.push(match);
  }
}
console.groupEnd();

console.log('matches', matches);

console.log('participants', users[0].participants);

console.groupEnd();
