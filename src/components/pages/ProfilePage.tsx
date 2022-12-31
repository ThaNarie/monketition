import { me } from '../../data/me';
import { getMockLeague } from '../../mocks/Leage.mocks';
import { getMockMatch } from '../../mocks/Match.mocks';
import { type League } from '../../types/League';
import { OfficeInfo } from '../atoms/office-info/OfficeInfo';
import { LeagueGroup } from '../league/league-group/LeagueGroup';
import { MatchTile } from '../match-tile/MatchTile';
import { Section } from '../section/Section';
import './profile-page.scss';

const leagueData: Array<Partial<League>> = [
  getMockLeague({ type: 'continuous' }, { sportType: 'table-tennis' }),
  getMockLeague({ type: 'season' }, { sportType: 'pool' }),
  getMockLeague({ type: 'tournament' }, { sportType: 'foosball' }),
];

export function ProfilePage(): JSX.Element {
  return (
    <div className="profile-page">
      <h1>{me.name}</h1>
      <OfficeInfo office={me.office} />

      <h3 className="mt-4">Streak</h3>
      <p>per sport</p>
      <p>current: hot/cold</p>
      <p>best: xx</p>
      <p>worst: yy</p>

      <Section>
        <h3>Recent matches</h3>
        <div className="recent-matches row row-cols-1 row-cols-lg-2 g-4">
          <div className="col">
            <MatchTile match={getMockMatch({ player1: me })} me={me} className="h-100" />
          </div>
          <div className="col">
            <MatchTile match={getMockMatch({ player1: me })} me={me} className="h-100" />
          </div>
          <div className="col">
            <MatchTile match={getMockMatch({ player1: me })} me={me} className="h-100" />
          </div>
        </div>
      </Section>

      <Section>
        <h3>Awards</h3>
        <p>-</p>
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
