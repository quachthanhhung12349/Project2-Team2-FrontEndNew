import React from 'react';
// import './App.css';
import './assets/primary.scss';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Admin } from './components/Admin';
import { Doctor } from './components/Doctor';
import { Patient } from './components/Patient';
import {Forum} from "./components"

function App() {
  return (
    <div className="App" id="container">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <h1>Default Path</h1>} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/doctor" component={Doctor} />
          <Route path="/patient" component={Patient} />
          
        </Switch>
        <Link to="/login"> login</Link>
        <Link to="/patient">Patient</Link>
      </Router> 
    </div>
  );
}

export default App;
