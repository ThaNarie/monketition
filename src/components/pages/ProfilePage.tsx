import classNames from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import { users } from '../../data/createMockData';
import { me, ProfileUserContext } from '../../data/me';
import { getMockSport } from '../../mocks/Sport.mocks';
import { type League } from '../../types/League';
import { type Result } from '../../types/Result';
import { type SportType } from '../../types/Sport';
import { getInfoAboutUser } from '../../utils/participant/getInfoAboutParticipant';
import { Icon } from '../atoms/icon/Icon';
import { StreakInfo } from '../atoms/streak-info/StreakInfo';
import { LeagueCard } from '../league/leage-card/LeagueCard';
import { LeagueGroup } from '../league/league-group/LeagueGroup';
import { MatchCard } from '../match/match-card/MatchCard';
import { MatchListing } from '../match/match-listing/MatchListing';
import { OpponentRecord } from '../participant/opponent-record/OpponentRecord';
import { OpponentStats } from '../participant/opponent-stats/OpponentStats';
import { UserInfo } from '../participant/user-info/UserInfo';
import { AwardItem } from '../profile/award-item/AwardItem';
import { StreakCard } from '../profile/streak-card/StreakCard';
import { Section } from '../section/Section';
import styles from './profile-page.module.scss';

const awards: Array<{ title: string; amount: number; sport: SportType; achieved?: boolean }> = [
  { title: 'Games Played', amount: 1, sport: 'table-tennis', achieved: true },
  { title: 'Games Played', amount: 10, sport: 'table-tennis', achieved: true },
  { title: 'Games Played', amount: 100, sport: 'table-tennis' },
  { title: 'Games Played', amount: 1, sport: 'pool', achieved: true },
  { title: 'Games Played', amount: 10, sport: 'pool' },
  { title: 'Games Played', amount: 100, sport: 'pool' },
  { title: 'Games Played', amount: 1, sport: 'foosball' },
  { title: 'Games Played', amount: 10, sport: 'foosball' },
  { title: 'Games Played', amount: 100, sport: 'foosball' },
];

export function ProfilePage(): JSX.Element {
  const { id } = useParams();

  const user = id === 'me' ? me : users.find((userItem) => userItem.id === id) ?? me;
  const userInfo = getInfoAboutUser(user);

  const [firstMatch] = user.participants
    .map(({ matches }) => matches[0])
    .sort((a, b) => a.playedAt.getTime() - b.playedAt.getTime());
  const [mostRecentMatch] = user.participants
    .map(({ matches }) => matches.at(-1)!)
    .sort((a, b) => b.playedAt.getTime() - a.playedAt.getTime());

  // TODO: switch from elo score to rank, that is not yet implemented on the participant
  const [currentStreakParticipant] = [...user.participants].sort((a, b) => b.eloScore - a.eloScore);
  const [bestStreakParticipant] = [...user.participants].sort(
    (a, b) => b.bestStreak - a.bestStreak,
  );
  const [worstStreakParticipant] = [...user.participants].sort(
    (a, b) => a.worstStreak - b.worstStreak,
  );

  const [bestLeague, bestLeagueResult] = user.participants
    .map<[League, Result]>(({ league }) => [
      league,
      league.results.find((result) => result.participant.user === user)!,
    ])
    .sort(([, a], [, b]) => a.rank - b.rank)
    .at(-1)!;

  return (
    <ProfileUserContext.Provider value={user}>
      <div className={classNames(styles.profilePage, ' pt-5')}>
        <UserInfo user={user} variant="large" />
        <div className="row mt-5 gx-5">
          <div className="col-md-8">
            <div className={styles.userStats}>
              <div className="row mb-4">
                <div className="col-md-4 mb-3">
                  <h6>Games</h6>
                  <div className="text-muted">
                    <small>Some stats about your games</small>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total games played</span>
                    <span className={styles.statValue}>{userInfo.gamesPlayed}</span>
                    <span className={styles.statExtra}>
                      Across {user.participants.length} leagues
                    </span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total games won</span>
                    <span className={classNames(styles.statValue, 'text-success')}>
                      {userInfo.gamesWon}
                    </span>
                    <span className={styles.statExtra}></span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total games lost</span>
                    <span className={classNames(styles.statValue, 'text-danger')}>
                      {userInfo.gamesLost}
                    </span>
                    <span className={styles.statExtra}></span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Win ratio</span>
                    <span
                      className={classNames(styles.statValue, {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        'text-success': userInfo.winRatio > 0.5,
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        'text-danger': userInfo.winRatio < 0.5,
                      })}
                    >
                      {Math.round(userInfo.winRatio * 100)}%
                    </span>
                    <span className={styles.statExtra}></span>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4 mb-3">
                  <h6>Streaks</h6>
                  <div className="text-muted">
                    <small>Your highs and lows</small>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Current</span>
                    <span className={styles.statValue}>
                      <StreakInfo streak={currentStreakParticipant.currentStreak} reverse />
                    </span>
                    <span className={styles.statExtra}>
                      in{' '}
                      <Link
                        to={`/leagues/${currentStreakParticipant.league.slug}`}
                        className="link-secondary"
                      >
                        {currentStreakParticipant.league.name}
                      </Link>{' '}
                      <Icon icon={currentStreakParticipant.league.sport.type} size={18} />
                    </span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Best</span>
                    <span className={styles.statValue}>
                      <StreakInfo streak={bestStreakParticipant.bestStreak} reverse />
                    </span>
                    <span className={styles.statExtra}>
                      in{' '}
                      <Link
                        to={`/leagues/${bestStreakParticipant.league.slug}`}
                        className="link-secondary"
                      >
                        {bestStreakParticipant.league.name}
                      </Link>{' '}
                      <Icon icon={bestStreakParticipant.league.sport.type} size={18} />
                    </span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Worst</span>
                    <span className={styles.statValue}>
                      <StreakInfo streak={worstStreakParticipant.worstStreak} reverse />
                    </span>
                    <span className={styles.statExtra}>
                      in{' '}
                      <Link
                        to={`/leagues/${worstStreakParticipant.league.slug}`}
                        className="link-secondary"
                      >
                        {worstStreakParticipant.league.name}
                      </Link>{' '}
                      <Icon icon={worstStreakParticipant.league.sport.type} size={18} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4 mb-3">
                  <h6>Best league</h6>
                  <div className="text-muted">
                    <small>
                      Based on your position
                      <br />
                      <br />
                      You are ranked <span className="text-white">
                        #{bestLeagueResult.rank}
                      </span>{' '}
                      <br />
                      with a rating of <span className="text-white">{bestLeagueResult.score}</span>
                    </small>
                  </div>
                </div>
                <div className="col-md-8">
                  {/*TODO: change to a league card with more of your own info*/}
                  <LeagueCard {...bestLeague} />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4 mb-3">
                  <h6>Most recent game</h6>
                  <div className="text-muted">
                    <small>
                      Played {formatDistanceToNow(mostRecentMatch.playedAt, { addSuffix: true })}
                    </small>
                  </div>
                </div>
                <div className="col-md-8">
                  <MatchCard match={mostRecentMatch} />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4 mb-3">
                  <h6>First game</h6>
                  <div className="text-muted">
                    <small>
                      Played {formatDistanceToNow(firstMatch.playedAt, { addSuffix: true })}
                    </small>
                  </div>
                </div>
                <div className="col-md-8">
                  <MatchCard match={firstMatch} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <OpponentStats user={user} />
          </div>
        </div>
        <Section heading="Awards">
          <div className={styles.awards}>
            {awards.map(({ title, amount, sport, achieved }) => (
              <AwardItem
                key={title + amount + sport}
                type={title}
                amount={amount}
                sport={getMockSport({ type: sport })}
                achieved={achieved}
              />
            ))}
          </div>
        </Section>
        {user !== me && (
          <MatchListing
            heading="Matches against you"
            matches={user.participants
              .flatMap(({ matches }) => matches)
              .filter((match) => match.participants.some((participant) => participant.user === me))}
            display="full"
            ctaType="external"
            externalSearchParams={{ player: user.id, opponent: me.id }}
          />
        )}
        <MatchListing
          matches={user.participants
            .flatMap(({ matches }) => matches)
            .sort((a, b) => b.playedAt.getTime() - a.playedAt.getTime())}
          display="full"
          ctaType="external"
          externalSearchParams={{ player: user.id }}
        />
        <LeagueGroup
          groupName="Your leagues"
          description="These are the leagues you are currently participating in."
          leagues={user.participants.map(({ league }) => league)}
        />
        <Section heading="Competitions">
          <ul>
            <li>Table Tennis Ladder (ranking, streaks, matches, days joined)</li>
            <li>Pool Ladder (ranking, streaks, matches, days joined)</li>
          </ul>

          <h3>Competitions Graphs</h3>
          <h3 className="mt-4 mb-4">Streak Info</h3>
          <div className="streak-listing row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mb-5">
            {user.participants.map((participant) => (
              <div className="col" key={participant.id}>
                <StreakCard participant={participant} />
              </div>
            ))}
          </div>
        </Section>
      </div>
    </ProfileUserContext.Provider>
  );
}
