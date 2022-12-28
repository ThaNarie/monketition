import { Outlet } from 'react-router-dom';
import './App.css';
import { Nav } from './components/nav/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
