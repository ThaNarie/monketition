import { faker } from '@faker-js/faker';
import classNames from 'clsx';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getMockLeague } from '../../mocks/Leage.mocks';
import { getMockResult } from '../../mocks/Result.mocks';
import { LeagueTable } from '../league-table/LeagueTable';

const leagueData = getMockLeague();

export function League(): JSX.Element {
  const { id } = useParams();
  return (
    <div>
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

      <div className="row gx-5">
        <div className="col-lg-4 order-lg-last" style={{ marginTop: 40 }}>
          <div className="row gy-3">
            <p>{leagueData.description}</p>
            <div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Period</h5>
                  <p className="card-text">Running permanently</p>
                  <p className="card-text">Start: 24 Dec 2022</p>
                  <p className="card-text">End: 6 Feb 2023</p>
                  <p className="card-text">X days remaining</p>
                  <p className="card-text">Progress bar</p>
                  <p className="card-text">Day x / y</p>
                </div>
              </div>
            </div>

            <div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Office</h5>
                  <p className="card-text">Hilversum</p>
                </div>
              </div>
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
