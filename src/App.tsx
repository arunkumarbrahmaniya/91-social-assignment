import React from 'react';
import './App.css';
import PrimarySearchAppBar from './component/header';
import StickyHeadTableHistory from './component/spacex-history';
import StickyHeadTableAddress from './component/spaxex-address';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
function App() {
  return (
    <div className="App">
        <PrimarySearchAppBar/>
        <h1>Select options to See the SpaceX History or Address</h1>
        <Router>
      <div>
            <Link to="/" style={{float:'left'}}>Home</Link>
            <Link to="/history" style={{paddingRight:100, float:'left'}}>Space X History</Link>
            <Link to="/address" style={{float:'left'}}>Space X Address</Link>

        <Switch>
          <Route path="/history">
            <StickyHeadTableHistory />
          </Route>
          <Route path="/address">
            <StickyHeadTableAddress />
          </Route>
        </Switch>
      </div>
    </Router>
        {/* <StickyHeadTableHistory/>
        <StickyHeadTableAddress/> */}
    </div>
  );
}

export default App;
