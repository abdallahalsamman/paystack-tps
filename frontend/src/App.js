import React from 'react';
import TransfersBrowser from './TransfersBrowser';
import TransferForm from './TransferForm';
import AppCss from './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={TransfersBrowser} />
        <Route path="/transfer/new" component={TransferForm} />
      </div>
    </Router>
  );
}

export default AppRouter;
