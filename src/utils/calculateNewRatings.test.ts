import { calculateNewRatings } from './calculateNewRatings';
//
//   it('calculates the correct new ratings for the winner and loser', () => {
//     const ratings = calculateNewRatings(1200, 1000);
//     expect(ratings.winner).toBeGreaterThan(1200);
//     expect(ratings.loser).toBeLessThan(1000);
//   });
//
//   it('gives the winner a larger rating increase than the loser', () => {
//     const ratings = calculateNewRatings(1200, 1000);
//     expect(ratings.winner - 1200).toBeGreaterThan(ratings.loser - 1000);
//   });
//
//   it('handles cases where the winner has a higher rating than the loser', () => {
//     const ratings = calculateNewRatings(1500, 1000);
//     expect(ratings.winner).toBeGreaterThan(1500);
//     expect(ratings.loser).toBeLessThan(1000);
//   });
//
//   it('handles cases where the winner has a lower rating than the loser', () => {
//     const ratings = calculateNewRatings(1000, 1500);
//     expect(ratings.winner).toBeGreaterThan(1000);
//     expect(ratings.loser).toBeLessThan(1500);
//   });
// });
