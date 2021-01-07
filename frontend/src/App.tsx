import React from 'react';
// import './App.css';
import './assets/primary.scss';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Admin } from './components/Admin';
import { Doctor } from './components/Doctor';
import { Patient } from './components/Patient';

function App() {
  return (
<<<<<<< HEAD
    <div className="App">
=======
    <div className="App" id="container">
>>>>>>> ffdb2e5dd7234edb26f6723c444da63e3d69e506
      <Router>
        <Switch>
          <Route exact path="/" render={() => <h1>Default Path</h1>} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/doctor" component={Doctor} />
          <Route path="/patient" component={Patient} />
        </Switch>
<<<<<<< HEAD
        { <Link to="/login"> login</Link> }
=======
        <Link to="/login"> login</Link>
>>>>>>> ffdb2e5dd7234edb26f6723c444da63e3d69e506
      </Router>
    </div>
  );
}

export default App;
