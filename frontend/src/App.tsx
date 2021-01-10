import React, {useState} from 'react';
import './assets/primary.scss';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import { User } from './models/User';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Admin } from './components/Admin';
import { Doctor } from './components/Doctor';
import { PatientHome } from './components/PatientHome';
import { RequestList } from './components/RequestList';
import {ForumList} from './components/ForumList'

export const UserContext = React.createContext<any>(undefined)

function App() {
  const [user, changeUser] = useState<User>()
  return (
    <div>
    <UserContext.Provider value={user}>
      <Router >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/admin" component={Admin} />
          <Route path="/doctor" component={Doctor} />
          <Route path="/patient" component={PatientHome} />
          <Route path="/requestList" component={RequestList} />
          <Route path="/forumList" component={ForumList} />
          <Redirect from="/" to="/login" /> 
          
        </Switch>
        {/* <Link to="/login"> login</Link> */}
        {/* <Link to="/patient">Patient</Link> */}
      </Router> 
      </UserContext.Provider>
    </div>
  );
}

export default App;

      