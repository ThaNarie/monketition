import { Outlet, ScrollRestoration } from 'react-router-dom';
import './app.scss';
import { Nav } from './components/nav/Nav';

export function App(): JSX.Element {
  return (
    <div className="App">
      <Nav />
      <div className="container" style={{ minHeight: 'calc(100vh - 65px - 60px)' }}>
        <Outlet />
      </div>
      <ScrollRestoration />
      <footer>
        <small>
          &copy; {new Date().getFullYear()}{' '}
          <a href="mailto:narie@mediamonks.com">Arjan &quot;Narie&quot; van Wijk</a> for use within{' '}
          <strong>Media.Monks</strong> - This site is still WIP and not ready for production use.
        </small>
      </footer>
    </div>
  );
}
