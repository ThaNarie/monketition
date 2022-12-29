import { themes } from '@storybook/theming';
import { withRouter } from './withRouter';

const hasDarkModeEnabled =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const decorators = [withRouter];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    theme: hasDarkModeEnabled ? themes.dark : themes.light,
  },
};

document.body.setAttribute('data-bs-theme', 'dark');
