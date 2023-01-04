import { useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { matches } from '../../data/createMockData';
import { MatchListing } from '../match/match-listing/MatchListing';
import './matches-page.scss';

export function MatchesPage(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 24;
  const visibleMatches = matches.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );
  const totalPages = Math.ceil(matches.length / itemsPerPage);

  return (
    <div className="matches-page pt-5 pb-5">
      <h1>Matches</h1>
      <div className="my-4">
        <MatchListing matches={visibleMatches} onlyListing amount="all" />
      </div>
      <Pagination>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            active={index === currentPage}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={(): void => {
              setCurrentPage(index);
            }}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}
