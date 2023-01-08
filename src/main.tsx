import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/pages/HomePage';
import { LeaguePage } from './components/pages/LeaguePage';
import { LeaguesPage } from './components/pages/LeaguesPage';
import { MatchesPage } from './components/pages/MatchesPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { RulesPage } from './components/pages/RulesPage';
import { ScoreKeeperPage } from './components/pages/ScoreKeeperPage';
import { me, UserContext } from './data/me';
import './index.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        element={
          <div className="container" style={{ minHeight: 'calc(100vh - 65px - 60px)' }}>
            <Outlet />
          </div>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="leagues" element={<LeaguesPage />} />
        <Route path="leagues/:id" element={<LeaguePage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="matches" element={<MatchesPage />} />
        <Route path="rules" element={<Navigate to="/rules/table-tennis" />} />
        <Route path="rules/:sport?" element={<RulesPage />} />
      </Route>
      <Route path="score" element={<ScoreKeeperPage />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <UserContext.Provider value={me}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  </React.StrictMode>,
);
