import { faker } from '@faker-js/faker';

export function Profile(): JSX.Element {
  return (
    <div>
      <h1>{faker.name.fullName()}</h1>

      <h3>Last match</h3>
      <p>date, versus, result</p>

      <h3>Streak</h3>
      <p>per sport</p>
      <p>current: hot/cold</p>
      <p>best: xx</p>
      <p>worst: yy</p>

      <h3>Office</h3>
      <p>Hilversum</p>

      <h3>Awards</h3>
      <p>-</p>

      <h3>Competitions</h3>
      <ul>
        <li>Table Tennis Ladder (ranking, streaks, matches, days joined)</li>
        <li>Pool Ladder (ranking, streaks, matches, days joined)</li>
      </ul>

      <h3>Competitions Graphs</h3>
    </div>
  );
}
