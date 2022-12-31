import { format } from 'date-fns';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getMockLeague } from '../../mocks/Leage.mocks';
import { type LeagueType } from '../../types/League';
import { OfficeInfo } from '../atoms/office-info/OfficeInfo';
import { SportInfo } from '../atoms/sport-info/SportInfo';
import { sportIcons } from '../league/leage-tile/LeagueTile';
import { LeagueProgress } from '../league/league-progress/LeagueProgress';
import { LeagueTable } from '../league/league-table/LeagueTable';
import { leagueIcons, LeagueTitle } from '../league/league-title/LeagueTitle';
import './league.scss';

const leagueData = getMockLeague();

const leagueTypeMap: Record<LeagueType, string> = {
  continuous: 'Permanent Ladder',
  season: 'Season Ladder',
  tournament: 'Tournament',
};

export function LeaguePage(): JSX.Element {
  const { id } = useParams();
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
      <div className="basic-info">
        {leagueData.sport && <SportInfo sport={leagueData.sport} />}
        {leagueData.type && (
          <div>
            <span className="material-symbols-outlined md-18">{leagueIcons[leagueData.type]}</span>{' '}
            {leagueTypeMap[leagueData.type]}
          </div>
        )}
        {leagueData.office && <OfficeInfo office={leagueData.office} />}
      </div>

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
