import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import { Home } from './components/pages/Home';
import { League } from './components/pages/League';
import { Leagues } from './components/pages/Leagues';
import { Profile } from './components/pages/Profile';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="leagues" element={<Leagues />} />
      <Route path="leagues/:id" element={<League />} />
      <Route path="profile/:id" element={<Profile />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
