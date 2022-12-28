import { faker } from '@faker-js/faker';
import { Link } from 'react-router-dom';

type Leage = {
  name: string;
  slug: string;
  playerCount: number;
  lastMatchPlayedAt: Date;
};

const leageData: ReadonlyArray<Leage> = Array.from({ length: 30 }, () => {
  const name = faker.lorem.words(2);
  return {
    name,
    slug: faker.helpers.slugify(name),
    playerCount: faker.datatype.number({ min: 10, max: 100 }),
    lastMatchPlayedAt: faker.date.past(1),
  };
});

type CardProps = Leage & { className?: string };

function Card({ slug, name, playerCount, lastMatchPlayedAt, className }: CardProps): JSX.Element {
  return (
    <div className={`card ${className}`}>
      <div className="card-body">
        <Link to={`/leages/${slug}`}>
          <h4 style={{ display: 'inline-block' }}>{name}</h4>
        </Link>
        <p>Count: {playerCount}</p>
        <p>Last Match: {lastMatchPlayedAt.toDateString()}</p>
      </div>
    </div>
  );
}

function ComingSoonCard(): JSX.Element {
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <p>Coming later</p>
        </div>
      </div>
    </div>
  );
}

type LeageGroupProps = {
  className?: string;
  groupName: string;
  leages?: Array<Leage>;
};

function LeageGroup({ className, groupName, leages }: LeageGroupProps): JSX.Element {
  return (
    <div className={`mt-4 ${className}`}>
      <h2>{groupName}</h2>
      <div className="row g-2">
        {leages ? (
          leages.map((leage) => (
            <div className="col-md-3" key={leage.slug}>
              <Card {...leage} />
            </div>
          ))
        ) : (
          <ComingSoonCard />
        )}
      </div>
    </div>
  );
}

export function Leages(): JSX.Element {
  return (
    <div>
      <h1>Leages</h1>

      <LeageGroup groupName="Your leages" leages={leageData.slice(0, 3)} />
      <LeageGroup groupName="Continuous Ladder" leages={leageData.slice(0, 7)} />
      <LeageGroup groupName="Ladder Season" />
      <LeageGroup groupName="Tournament" />
    </div>
  );
}
