import { getMockLeague } from '../../mocks/Leage.mocks';
import { type League } from '../../types/League';
import { LeagueGroup } from '../league/league-group/LeagueGroup';

const leagueData: Array<Partial<League>> = [
  getMockLeague({ type: 'continuous' }, { sportType: 'table-tennis' }),
  getMockLeague({ type: 'season' }, { sportType: 'pool' }),
  getMockLeague({ type: 'tournament' }, { sportType: 'foosball' }),
];
export function HomePage(): JSX.Element {
  return (
    <div className="mt-4">
      <h1>Home</h1>

      <div className="info mb-5">
        <p>
          I need to add some information about this website here, so that everyone knows what it is.
        </p>
        <p>Things to add to this page:</p>
        <ul>
          <li>Recent matches</li>
          <li>Upcoming and active tournaments</li>
          <li>Profile card with your info</li>
          <li>Suggestions for leagues to participate in at your office location</li>
        </ul>
      </div>

      <LeagueGroup
        groupName="Your leagues"
        description="These are the leagues you are currently participating in."
        leagues={leagueData}
      />
    </div>
  );
}
