import type { StoryObj } from '@storybook/react';
import { getMockLeague } from '../../../mocks/Leage.mocks';
import { LeagueTile } from './LeagueTile';

export default {
  title: 'league/LeagueTile',
  component: LeagueTile,
};

export const Default: StoryObj<typeof LeagueTile> = {
  render(props) {
    return <LeagueTile {...props} />;
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
            <LeagueTile {...getMockLeague()} />
          </div>
        ))}
      </div>
    );
  },
};
