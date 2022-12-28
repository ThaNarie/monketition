import { faker } from '@faker-js/faker';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const tableData = Array.from({ length: 30 }, (_, index) => ({
  position: index + 1,
  name: faker.name.fullName(),
  score: faker.datatype.number({ min: 3000 - index * 100, max: 3000 - (index - 1) * 100 }),
  streak:
    Math.round(faker.datatype.number({ max: 10, precision: 0.0001 }) ** 4 / 1000) *
    (Math.random() > 0.5 ? 1 : -1),
}));

export function Leage(): JSX.Element {
  const { id } = useParams();
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/leages">Leages</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Leage {id}
          </li>
        </ol>
      </nav>
      <h1>Leage {id}</h1>

      <div className="row gx-5">
      <div className="col-md-8">
          <p>
            Description of the leage lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            imperdiet dui a imperdiet volutpat. Curabitur diam ipsum, pulvinar vitae nisl nec, porta
            vulputate orci. Maecenas finibus felis metus, blandit lobortis turpis iaculis vitae.
            Praesent eu sem orci. Phasellus tincidunt ante non massa tempor, vel semper quam
            placerat.
          </p>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" style={{ width: 30, textAlign: 'right' }}>
                  #
                </th>
                <th scope="col">Name</th>
                <th scope="col" style={{ width: 70, textAlign: 'right' }}>
                  Score
                </th>
                <th scope="col" style={{ width: 60 }}>
                  Streak
                </th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {tableData.map((item) => (
                <tr key={item.position}>
                  <th style={{ textAlign: 'right' }} scope="row">
                    {item.position}
                  </th>
                  <td>{item.name}</td>
                  <td style={{ textAlign: 'right' }}>{item.score}</td>
                  <td style={{ textAlign: 'center' }}>
                    {Math.abs(item.streak) > 2 ? item.streak : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4">
          <div className="row gy-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Period</h5>
                <p className="card-text">Running permanently</p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Office</h5>
                <p className="card-text">Hilversum</p>
              </div>
            </div>

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
    </div>
  );
}
