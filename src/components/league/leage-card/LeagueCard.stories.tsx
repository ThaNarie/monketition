import type { StoryObj } from '@storybook/react';
import { getMockLeague } from '../../../mocks/Leage.mocks';
import { LeagueCard } from './LeagueCard';

export default {
  title: 'league/LeagueCard',
  component: LeagueCard,
};

export const Default: StoryObj<typeof LeagueCard> = {
  render(props) {
    return <LeagueCard {...props} />;
  },
  args: {
    ...getMockLeague(),
  },
};

export const List: StoryObj = {
  render(props) {
    return (
      <div className="row gy-2 m-5">
        {Array.from({ length: 10 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="col-xl-6" key={index}>
            <LeagueCard {...getMockLeague()} />
          </div>
        ))}
      </div>
    );
  },
};
