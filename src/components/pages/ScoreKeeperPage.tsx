import classNames from 'clsx';
import { users } from '../../data/createMockData';
import { useUser } from '../../data/me';
import styles from './ScoreKeeperPage.module.scss';

export function ScoreKeeperPage(): JSX.Element {
  const me = useUser();
  const opponent = users.find((user) => user.id !== me.id)!;
  return (
    <div className={classNames(styles.scoreKeeperPage, 'pt-4')}>
      <div className={classNames(styles.layout, 'mb-5')}>
        {/* players and set score */}
        <div className={classNames(styles.player, styles.participant)}>{me.name}</div>
        <div className={classNames(styles.playerSetScore, styles.score)}>1</div>
        <span className={classNames(styles.versus, 'text-muted')}>vs</span>
        <div className={classNames(styles.opponentSetScore, styles.score, styles.isAhead)}>3</div>
        <div className={classNames(styles.opponent, styles.participant)}>{opponent.name}</div>
        {/* game score */}
        <div className={classNames(styles.playerGameScore, styles.point)}>3</div>
        <span className={classNames(styles.gameVersus, 'text-muted')}>:</span>
        <div className={classNames(styles.opponentGameScore, styles.point)}>1</div>
      </div>
      <div className={styles.previousGamesScore}>
        {/* previous game scores */}
        <div className={classNames(styles.playerPreviousGameScore)}>11</div>
        <div className={classNames(styles.previousGameVersus)}>:</div>
        <div className={classNames(styles.opponentPreviousGameScore)}>3</div>
        <div className={classNames(styles.playerPreviousGameScore)}>12</div>
        <div className={classNames(styles.previousGameVersus)}>:</div>
        <div className={classNames(styles.opponentPreviousGameScore)}>14</div>
        <div className={classNames(styles.playerPreviousGameScore)}>5</div>
        <div className={classNames(styles.previousGameVersus)}>:</div>
        <div className={classNames(styles.opponentPreviousGameScore)}>11</div>
      </div>
      <div className="container mt-5">
        <h3>TODO</h3>
        <ul style={{ maxWidth: 500 }}>
          <li>Start with player selection</li>
          <li>default 1 player with logged in user</li>
          <li>Allow for player warmup</li>
          <li>
            Cointoss choice – let this page do it random, or let the players decide based on their
            wn methods
          </li>
          <li>Clearly indicate which player has service</li>
          <li>Allow clicking on the score to increase it for the player that won a point</li>
          <li>Clearly indicate when a game is won, and update set score</li>
          <li>Add game result to bottom of page</li>
          <li>Add league rank + elo score to the page</li>
          <li>Let 1 other player connect to the page to update score from their phone</li>
        </ul>
      </div>
    </div>
  );
}
