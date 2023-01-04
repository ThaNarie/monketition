import { useParams } from 'react-router-dom';
import { users } from '../../data/createMockData';
import { me, ProfileUserContext } from '../../data/me';
import { getMockSport } from '../../mocks/Sport.mocks';
import { type SportType } from '../../types/Sport';
import { Avatar } from '../atoms/avatar/Avatar';
import { JobInfo } from '../atoms/job-info/JobInfo';
import { OfficeInfo } from '../atoms/office-info/OfficeInfo';
import { LeagueGroup } from '../league/league-group/LeagueGroup';
import { MatchListing } from '../match/match-listing/MatchListing';
import { AwardItem } from '../profile/award-item/AwardItem';
import { StreakCard } from '../profile/streak-card/StreakCard';
import { Section } from '../section/Section';
import './profile-page.scss';

const awards: Array<{ title: string; amount: number; sport: SportType; achieved?: boolean }> = [
  { title: 'Games Played', amount: 1, sport: 'table-tennis', achieved: true },
  { title: 'Games Played', amount: 10, sport: 'table-tennis', achieved: true },
  { title: 'Games Played', amount: 100, sport: 'table-tennis' },
  { title: 'Games Played', amount: 1, sport: 'pool', achieved: true },
  { title: 'Games Played', amount: 10, sport: 'pool' },
  { title: 'Games Played', amount: 100, sport: 'pool' },
  { title: 'Games Played', amount: 1, sport: 'foosball' },
  { title: 'Games Played', amount: 10, sport: 'foosball' },
  { title: 'Games Played', amount: 100, sport: 'foosball' },
];

export function ProfilePage(): JSX.Element {
  const { id } = useParams();

  const user = id === 'me' ? me : users.find((userItem) => userItem.id === id) ?? me;

  return (
    <ProfileUserContext.Provider value={user}>
      <div className="profile-page pt-5">
        <div className="container">
          <div className="avatar">
            <Avatar user={user} size={72} className="" />
          </div>
          <h1>{user.name}</h1>
          <div className="user-info">
            <OfficeInfo office={user.office} /> <JobInfo jobType={user.jobType} />
          </div>
        </div>
        <h3 className="mt-4 mb-4">Streak Info</h3>
        <div className="streak-listing row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mb-5">
          {user.participants.map((participant) => (
            <div className="col" key={participant.id}>
              <StreakCard participant={participant} />
            </div>
          ))}
        </div>
        <Section heading="Awards">
          <div className="awards">
            {awards.map(({ title, amount, sport, achieved }) => (
              <AwardItem
                key={title + amount + sport}
                type={title}
                amount={amount}
                sport={getMockSport({ type: sport })}
                achieved={achieved}
              />
            ))}
          </div>
        </Section>
        {user !== me && (
          <MatchListing
            heading="Matches against you"
            matches={user.participants
              .flatMap(({ matches }) => matches)
              .filter((match) => match.participants.some((participant) => participant.user === me))}
            display="full"
          />
        )}
        <MatchListing
          matches={user.participants.flatMap(({ matches }) => matches)}
          display="full"
        />
        <LeagueGroup
          groupName="Your leagues"
          description="These are the leagues you are currently participating in."
          leagues={user.participants.map(({ league }) => league)}
        />
        <Section heading="Competitions">
          <ul>
            <li>Table Tennis Ladder (ranking, streaks, matches, days joined)</li>
            <li>Pool Ladder (ranking, streaks, matches, days joined)</li>
          </ul>

          <h3>Competitions Graphs</h3>
        </Section>
      </div>
    </ProfileUserContext.Provider>
  );
}
