/**
 * Calculates the new Elo ratings for two players after a game.
 *
 * In the Elo rating system, the value of k is a parameter that determines the maximum change in
 * rating that a player can gain or lose in a single game. A higher value of k means that a
 * player's rating can change more dramatically in a single game, while a lower value of
 * k means that a player's rating will change less dramatically.
 *
 * The value of k is typically chosen based on the type of game being played and the desired rate
 * of rating change. For example, in chess, k is often set to a value of 32, because chess ratings
 * are intended to be stable over a long period of time and the average player's rating is around
 * 1500. This means that a player's rating will typically only change by a few points after each
 * game.
 *
 * In general, the value of k should be chosen based on the desired rate of rating change and the
 * expected standard deviation of player ratings in the population. It's also a good idea to adjust
 * the value of k over time as the ratings of the players in the population change.
 *
 * @param {number} winnerRating - The current Elo rating of the player who won the game.
 * @param {number} loserRating - The current Elo rating of the player who lost the game.
 * @param {number} k - The maximum rating a player can win or lose in a single game.
 * @returns {object} An object with two properties: `winner`, the new Elo rating for the
 *   winner, and `loser`, the new Elo rating for the loser.
 */

export function calculateNewRatings(
  winnerRating: number,
  loserRating: number,
  k = 32,
): { newWinnerRating: number; newLoserRating: number } {
  const winnerExpectedScore = 1 / (1 + 10 ** ((loserRating - winnerRating) / 400));
  const loserExpectedScore = 1 / (1 + 10 ** ((winnerRating - loserRating) / 400));

  const newWinnerRating = Math.round(winnerRating + k * (1 - winnerExpectedScore));
  const newLoserRating = Math.round(loserRating + k * (0 - loserExpectedScore));

  return {
    newWinnerRating,
    newLoserRating,
  };
}
