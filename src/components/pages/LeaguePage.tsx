import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { leagues } from '../../data/createMockData';
import { me } from '../../data/me';
import { getMockLeague } from '../../mocks/Leage.mocks';
import { EntityInfo } from '../atoms/entity-info/EntityInfo';
import { LeagueInfo } from '../atoms/league-info/LeagueInfo';
import { OfficeInfo } from '../atoms/office-info/OfficeInfo';
import { SportInfo } from '../atoms/sport-info/SportInfo';
import { ActivityChart } from '../league/leage-card/components/ActivityChart';
import { LeagueProgress } from '../league/league-progress/LeagueProgress';
import { LeagueTable } from '../league/league-table/LeagueTable';
import './league-page.scss';
import { MatchListing } from '../match/match-listing/MatchListing';

export function LeaguePage(): JSX.Element {
  const { id } = useParams();

  // if id is not found, get a random entry from the leagues array
  const league = useMemo(
    () =>
      leagues.find((leagueItem) => leagueItem.slug === id) ??
      leagues[Math.floor(Math.random() * leagues.length)],
    [id],
  );
  return (
    <div className="league-page">
      <nav aria-label="breadcrumb" className="mb-4 mt-3" style={{ borderBottom: '1px solid #444' }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/leagues">Leagues</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {league.name}
          </li>
        </ol>
      </nav>

      <h1>{league.name}</h1>
      <EntityInfo>
        <SportInfo sport={league.sport} />
        <LeagueInfo type={league.type} />
        <OfficeInfo office={league.office} />
      </EntityInfo>

      <div className="row gx-5">
        <div className="col-lg-4 order-lg-last" style={{ marginTop: 40 }}>
          <div className="row gy-3">
            <p>{league.description}</p>

            <div>
              <div className="league-activity-chart">
                <ActivityChart matches={league.matches} amount="all" height={50} />
              </div>
            </div>

            <div>
              <LeagueProgress league={league} />
            </div>

            <div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">League rules</h5>
                  <p className="card-text">This league follows the default rules.</p>
                  <Link to="/rules/table-tennis" className="button text-body-secondary">
                    Default rules
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 order-lg-first mt-3">
          <LeagueTable results={league.results ?? []} />
        </div>
      </div>
      <MatchListing
        heading="Your league matches"
        matches={league.matches.filter((match) =>
          match.participants.some((participant) => participant.user === me),
        )}
        display="full"
      />
      <MatchListing heading="Recent league matches" matches={league.matches} amount={6} />
    </div>
  );
}
