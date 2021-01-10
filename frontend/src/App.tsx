import React from 'react';
// import './App.css';
import './assets/primary.scss';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Admin } from './components/Admin';
import { Doctor } from './components/Doctor';
import { PatientHome } from './components/PatientHome';
import { RequestList } from './components/RequestList';
import {ForumList} from './components/ForumList'

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
          <Route path="/patient" component={PatientHome} />
          <Route path="/requestList" component={RequestList} />
          <Route path="/forumList" component={ForumList} />
          
        </Switch>
        <Link to="/login"> login</Link>
        <Link to="/patient">Patient</Link>
      </Router> 
    </div>
  );
}

export default App;
