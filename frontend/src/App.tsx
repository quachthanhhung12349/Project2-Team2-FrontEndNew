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
import { DoctorHome } from './components/DoctorHome';

function App() {
  return (
    <div className="App" id="container">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <h1>Default Path</h1>} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          
          <Route path="/patient" component={PatientHome} />
          <Route path="/requestList" component={RequestList} />
          <Route path="/doctor" component={DoctorHome} />
          
        </Switch>
        <Link to="/login"> login</Link>&nbsp;|&nbsp;
        <Link to="/patient">Patient</Link>&nbsp;|&nbsp;
        <Link to="/doctor">Doctor</Link>&nbsp;
      </Router> 
    </div>
  );
}

export default App;
