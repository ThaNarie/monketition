import { useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { type Match } from '../../../types/Match';
import { Section } from '../../section/Section';
import { MatchCard } from '../match-card/MatchCard';

export type MatchListingProps = {
  heading?: string;
  matches: Array<Match>;
  amount?: number | 'all';
  display?: 'full' | 'compact';
  ctaType?: 'inline' | 'external' | 'none';
  onlyListing?: boolean;
  externalSearchParams?: {
    player?: string;
    opponent?: string;
    league?: string;
    office?: string;
  };
};
export function MatchListing({
  heading = 'Recent Matches',
  matches,
  amount = 3,
  display = 'compact',
  ctaType = 'inline',
  onlyListing = false,
  externalSearchParams: externalSearchParameters = {},
}: MatchListingProps): JSX.Element {
  const [allVisible, setAllVisible] = useState(amount === 'all');

  const matchesToDisplay = useMemo(() => {
    if (amount === 'all' || allVisible) {
      return matches;
    }
    return matches.slice(0, amount);
  }, [matches, amount, allVisible]);

  const listing = (
    <div className="match-listing row row-cols-1 row-cols-md-2  row-cols-xl-3 g-4">
      {matchesToDisplay.map((match) => (
        <div className="col" key={match.id}>
          <MatchCard
            match={match}
            className="h-100"
            showDetails={display === 'full'}
            showFooter={display === 'full'}
          />
        </div>
      ))}
    </div>
  );

  if (onlyListing) {
    return listing;
  }

  return (
    <Section heading={heading}>
      {listing}
      {amount !== 'all' &&
        matches.length > amount &&
        (ctaType === 'inline' ? (
          <Button
            variant="outline-success"
            className="mt-3"
            onClick={(): void => {
              setAllVisible((value) => !value);
            }}
          >
            {allVisible ? <>Show less</> : <>Show all {matches.length} matches</>}
          </Button>
        ) : (
          <Link to={`/matches?${new URLSearchParams(externalSearchParameters).toString()}`}>
            <Button variant="outline-success" className="mt-3">
              See all matches
            </Button>
          </Link>
        ))}
    </Section>
  );
}
