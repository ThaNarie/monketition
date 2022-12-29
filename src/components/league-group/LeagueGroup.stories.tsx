import type { StoryObj } from '@storybook/react';
import { getLeagueMock } from '../../mocks/Leage.mocks';
import { LeagueGroup } from './LeagueGroup';

export default {
  title: 'league/LeagueGroup',
  component: LeagueGroup,
};

export const Default: StoryObj<typeof LeagueGroup> = {
  render(props) {
    return <LeagueGroup {...props} />;
  },
  args: {
    groupName: 'Your leagues',
    description: 'These are the leagues you are currently participating in.',
    leagues: Array.from({ length: 10 }).map((_, index) => getLeagueMock()),
  },
};

export const ComingSoon: StoryObj<typeof LeagueGroup> = {
  render(props) {
    return <LeagueGroup {...props} />;
  },
  args: {
    groupName: 'Your leagues',
    leagues: undefined,
  },
};
