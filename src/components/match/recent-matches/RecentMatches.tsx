import { Button } from 'react-bootstrap';
import { type Match } from '../../../types/Match';
import { Section } from '../../section/Section';
import { MatchTile } from '../match-tile/MatchTile';

export type RecentMatchesProps = {
  matches: Array<Match>;
  amount?: number;
};
export function RecentMatches({ matches, amount = 4 }: RecentMatchesProps): JSX.Element {
  return (
    <Section heading="Recent Matches">
      <div className="recent-matches row row-cols-1 row-cols-md-2  row-cols-xl-3 g-4">
        {matches.slice(0, amount).map((match) => (
          <div className="col" key={match.id}>
            <MatchTile match={match} className="h-100" />
          </div>
        ))}
      </div>
      <Button variant="outline-success" className="mt-3">
        View all {matches.length} matches
      </Button>
    </Section>
  );
}
