import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import { HomePage } from './components/pages/HomePage';
import { LeaguePage } from './components/pages/LeaguePage';
import { LeaguesPage } from './components/pages/LeaguesPage';
import { ProfilePage } from './components/pages/ProfilePage';
import './index.css';
import { me, UserContext } from './data/me';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="leagues" element={<LeaguesPage />} />
      <Route path="leagues/:id" element={<LeaguePage />} />
      <Route path="profile/:id" element={<ProfilePage />} />
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
