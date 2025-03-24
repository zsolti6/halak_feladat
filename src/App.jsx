import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { HalList } from './HalList';
import { HalSingle } from './HalSingle';
import { HalMod } from './HalMod';
import { NavLink } from 'react-router-dom';

export const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Halak</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HalList />} />
        <Route path="/hal/:halId" element={<HalSingle />} />
        <Route path="/hal-mod/:halId" element={<HalMod />} />
      </Routes>
    </Router>
  );
}