import { matches } from '../../data/createMockData';
import { useUser } from '../../data/me';
import { LeagueGroup } from '../league/league-group/LeagueGroup';
import { MatchListing } from '../match/match-listing/MatchListing';

export function HomePage(): JSX.Element {
  const me = useUser();

  return (
    <div className="mt-4">
      <h1>Hey {me.name}, welcome back!</h1>

      <div className="info mb-5">
        <p>
          I need to add some information about this website here, so that everyone knows what it is.
        </p>
        <p>Things to add to this page:</p>
        <ul>
          <li>Your recent matches</li>
          <li>Upcoming and active tournaments</li>
          <li>Profile card with your info</li>
          <li>Suggestions for leagues to participate in at your office location</li>
        </ul>
      </div>

      <MatchListing matches={matches} display="full" ctaType="external" />

      <LeagueGroup
        groupName="Your leagues"
        description="These are the leagues you are currently participating in."
        leagues={me.participants.map(({ league }) => league)}
        showMoreButton
      />
    </div>
  );
}
