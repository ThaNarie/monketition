import type { StoryObj } from '@storybook/react';
import { getMockUser } from '../../../mocks/User.mocks';
import { UserInfo } from './UserInfo';

export default {
  title: 'user/UserInfo',
  component: UserInfo,
};

export const Default: StoryObj<typeof UserInfo> = {
  render(props) {
    return (
      <div className="m-5">
        <UserInfo {...props} user={getMockUser()} />
      </div>
    );
  },
  args: {},
};

export const All: StoryObj = {
  render() {
    return (
      <>
        <div className="m-5">
          <UserInfo user={getMockUser()} variant="large" />
        </div>
        <div className="m-5">
          <UserInfo user={getMockUser()} variant="medium" />
        </div>
        <div className="m-5">
          <UserInfo user={getMockUser()} variant="medium" hideIcons />
        </div>
        <div className="m-5">
          <UserInfo user={getMockUser()} variant="small" />
        </div>
        <div className="m-5">
          <UserInfo user={getMockUser()} variant="small" hideOffice />
        </div>
      </>
    );
  },
};

export const Large: StoryObj<typeof UserInfo> = {
  render(props) {
    return (
      <div className="m-5">
        <UserInfo {...props} user={getMockUser()} />
      </div>
    );
  },
  args: {},
};

export const Medium: StoryObj<typeof UserInfo> = {
  render(props) {
    return (
      <div className="m-5">
        <UserInfo {...props} user={getMockUser()} />
      </div>
    );
  },
  args: {
    variant: 'medium',
  },
};

export const Small: StoryObj<typeof UserInfo> = {
  render(props) {
    return (
      <div className="m-5">
        <UserInfo {...props} user={getMockUser()} />
      </div>
    );
  },
  args: {
    variant: 'small',
    hideOffice: true,
  },
};
