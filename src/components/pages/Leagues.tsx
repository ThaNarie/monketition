import { getMockLeague } from '../../mocks/Leage.mocks';
import { type League } from '../../types/League';
import { LeagueGroup } from '../league-group/LeagueGroup';

const leagueData: ReadonlyArray<Partial<League>> = [
  getMockLeague({ type: 'continuous' }, { sportType: 'table-tennis' }),
  getMockLeague({ type: 'season' }, { sportType: 'pool' }),
  getMockLeague({ type: 'tournament' }, { sportType: 'foosball' }),
  ...Array.from({ length: 30 }, () => getMockLeague()),
];

export function Leagues(): JSX.Element {
  return (
    <div className="mt-4">
      <h1>Leagues</h1>

      <div className="info mb-5">
        <p>
          An overview of the leagues that might be interested to you. Use the filters to widen or
          narrow your results.
        </p>
      </div>

      <LeagueGroup
        groupName="Your leagues"
        description="These are the leagues you are currently participating in."
        leagues={leagueData.slice(0, 3)}
      />
      <LeagueGroup
        groupName="Continuous Ladder"
        description="Every ladder game you play, unrelated to which season, will count to your permanent record."
        leagues={leagueData.filter(({ type }) => type === 'continuous').slice(0, 7)}
      />
      <LeagueGroup
        groupName="Ladder Season"
        description="Short lived ladder seasons allow you to ignore past mistakes, see if you can reach the top!"
      />
      <LeagueGroup
        groupName="Tournament"
        description="Short-lived tournaments in varied formats."
      />
    </div>
  );
}
