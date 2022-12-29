import { PropsWithChildren } from 'react';
import { MemoryRouter, Routes } from 'react-router';
import { Route } from 'react-router-dom';

export type StoryRouterProps = {
  browserPath?: string;
  routePath?: string;
  routeParams?: Record<string, string>;
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0];
  routeState?: unknown;
  outlet?: React.ReactNode;
};

// TODO: https://github.com/JesusTheHun/storybook-addon-react-router-v6/blob/main/src/components/StoryRouter.tsx
export function StoryRouter({ children }: PropsWithChildren<StoryRouterProps>): JSX.Element {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/*" element={children} />
      </Routes>
    </MemoryRouter>
  );
}
