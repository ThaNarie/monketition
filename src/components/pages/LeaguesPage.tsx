import { leagues, matches } from '../../data/createMockData';
import { useUser } from '../../data/me';
import { LeagueGroup } from '../league/league-group/LeagueGroup';
import { MatchListing } from '../match/match-listing/MatchListing';

export function LeaguesPage(): JSX.Element {
  const me = useUser();

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
        leagues={me.participants.map(({ league }) => league)}
      />
      <LeagueGroup
        groupName="Continuous Ladder"
        description="Every ladder game you play, unrelated to which season, will count to your permanent record."
        leagues={leagues.filter(({ type }) => type === 'continuous').slice(0, 7)}
      />
      <LeagueGroup
        groupName="Ladder Season"
        description="Short lived ladder seasons allow you to ignore past mistakes, see if you can reach the top!"
      />
      <LeagueGroup
        groupName="Tournament"
        description="Short-lived tournaments in varied formats."
      />
      <MatchListing matches={matches} display="full" ctaType="external" />
    </div>
  );
}
