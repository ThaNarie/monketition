import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { leagues } from '../../data/createMockData';
import { getMockLeague } from '../../mocks/Leage.mocks';
import { EntityInfo } from '../atoms/entity-info/EntityInfo';
import { LeagueInfo } from '../atoms/league-info/LeagueInfo';
import { OfficeInfo } from '../atoms/office-info/OfficeInfo';
import { SportInfo } from '../atoms/sport-info/SportInfo';
import { LeagueProgress } from '../league/league-progress/LeagueProgress';
import { LeagueTable } from '../league/league-table/LeagueTable';
import './league-page.scss';

export function LeaguePage(): JSX.Element {
  const { id } = useParams();

  // if id is not found, get a random entry from the leagues array
  const leagueData = useMemo(
    () =>
      leagues.find((league) => league.slug === id) ??
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
            {leagueData.name}
          </li>
        </ol>
      </nav>

      <h1>{leagueData.name}</h1>
      <EntityInfo>
        <SportInfo sport={leagueData.sport} />
        <LeagueInfo type={leagueData.type} />
        <OfficeInfo office={leagueData.office} />
      </EntityInfo>

      <div className="row gx-5">
        <div className="col-lg-4 order-lg-last" style={{ marginTop: 40 }}>
          <div className="row gy-3">
            <p>{leagueData.description}</p>
            <div>
              <LeagueProgress league={leagueData} />
            </div>

            <div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Custom rules</h5>
                  <p className="card-text">There are no custom rules</p>
                  <Link to="/rules/table-tennis" className="button">
                    Default rules
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 order-lg-first mt-3">
          <LeagueTable results={leagueData.results ?? []} />
        </div>
      </div>
    </div>
  );
}
