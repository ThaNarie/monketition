import { me } from '../../data/me';
import { getMockLeague } from '../../mocks/Leage.mocks';
import { getMockMatch } from '../../mocks/Match.mocks';
import { getMockSport } from '../../mocks/Sport.mocks';
import { type League } from '../../types/League';
import { type SportType } from '../../types/Sport';
import { OfficeInfo } from '../atoms/office-info/OfficeInfo';
import { LeagueGroup } from '../league/league-group/LeagueGroup';
import { MatchTile } from '../match-tile/MatchTile';
import { AwardItem } from '../profile/award-item/AwardItem';
import { StreakCard } from '../profile/streak-card/StreakCard';
import { Section } from '../section/Section';
import './profile-page.scss';

const leagueData: Array<Partial<League>> = [
  getMockLeague({ type: 'continuous' }, { sportType: 'table-tennis' }),
  getMockLeague({ type: 'season' }, { sportType: 'pool' }),
  getMockLeague({ type: 'tournament' }, { sportType: 'foosball' }),
];

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
  return (
    <div className="profile-page pt-5">
      <h1>{me.name}</h1>
      <OfficeInfo office={me.office} />

      <h3 className="mt-4">Streak Info</h3>
      <div className="recent-matches row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mb-5">
        <div className="col">
          <StreakCard streakInfo={me} sport={getMockSport({ type: 'table-tennis' })} />
        </div>
        <div className="col">
          <StreakCard streakInfo={me} sport={getMockSport({ type: 'pool' })} />
        </div>
        <div className="col">
          <StreakCard streakInfo={me} sport={getMockSport({ type: 'foosball' })} />
        </div>
      </div>

      <Section>
        <h3>Recent Matches</h3>
        <div className="recent-matches row row-cols-1 row-cols-md-2  row-cols-xl-3 g-4">
          <div className="col">
            <MatchTile match={getMockMatch({}, { player1: me })} me={me} className="h-100" />
          </div>
          <div className="col">
            <MatchTile match={getMockMatch({}, { player1: me })} me={me} className="h-100" />
          </div>
          <div className="col">
            <MatchTile match={getMockMatch({}, { player1: me })} me={me} className="h-100" />
          </div>
        </div>
      </Section>

      <Section>
        <h3>Awards</h3>
        <div className="awards">
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

      <LeagueGroup
        groupName="Your leagues"
        description="These are the leagues you are currently participating in."
        leagues={leagueData}
      />
      <Section>
        <h3>Competitions</h3>
        <ul>
          <li>Table Tennis Ladder (ranking, streaks, matches, days joined)</li>
          <li>Pool Ladder (ranking, streaks, matches, days joined)</li>
        </ul>

        <h3>Competitions Graphs</h3>
      </Section>
    </div>
  );
}
