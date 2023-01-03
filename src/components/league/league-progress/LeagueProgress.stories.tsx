import type { StoryObj } from '@storybook/react';
import { getMockLeague } from '../../../mocks/Leage.mocks';
import { LeagueProgress } from './LeagueProgress';

export default {
  title: 'league/LeagueProgress',
  component: LeagueProgress,
};

export const Default: StoryObj<typeof LeagueProgress> = {
  render(props) {
    return (
      <div style={{ width: 300 }}>
        <LeagueProgress {...props} />
      </div>
    );
  },
  args: {
    league: getMockLeague(),
  },
};

export const Versions: StoryObj = {
  render() {
    return (
      <div>
        <h3 className="mb-5">Upcoming</h3>
        <div style={{ width: 300 }} className="mb-5">
          <LeagueProgress
            league={getMockLeague({ fields: { type: 'continuous' }, status: 'upcoming' })}
          />
        </div>
        <div style={{ width: 300 }} className="mb-5">
          <LeagueProgress
            league={getMockLeague({ fields: { type: 'season' }, status: 'upcoming' })}
          />
        </div>
        <div style={{ width: 300 }} className="mb-5">
          <LeagueProgress
            league={getMockLeague({ fields: { type: 'tournament' }, status: 'upcoming' })}
          />
        </div>
        <h3 className="mb-5">Ongoing</h3>
        <div style={{ width: 300 }} className="mb-5">
          <LeagueProgress
            league={getMockLeague({ fields: { type: 'continuous' }, status: 'ongoing' })}
          />
        </div>
        <div style={{ width: 300 }} className="mb-5">
          <LeagueProgress
            league={getMockLeague({ fields: { type: 'season' }, status: 'ongoing' })}
          />
        </div>
        <div style={{ width: 300 }} className="mb-5">
          <LeagueProgress
            league={getMockLeague({ fields: { type: 'tournament' }, status: 'ongoing' })}
          />
        </div>
        <h3 className="mb-5">Finished</h3>
        <div style={{ width: 300 }} className="mb-5">
          <LeagueProgress
            league={getMockLeague({ fields: { type: 'continuous' }, status: 'finished' })}
          />
        </div>
        <div style={{ width: 300 }} className="mb-5">
          <LeagueProgress
            league={getMockLeague({ fields: { type: 'season' }, status: 'finished' })}
          />
        </div>
        <div style={{ width: 300 }} className="mb-5">
          <LeagueProgress
            league={getMockLeague({ fields: { type: 'tournament' }, status: 'finished' })}
          />
        </div>
      </div>
    );
  },
};
