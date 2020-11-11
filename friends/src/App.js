import React, { useState } from 'react';
import { axiosWithAuth } from './utils/axiosWithAuth'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import FriendList from './components/FriendList';
import Login from './components/Login';


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    axiosWithAuth()
      .post('/login')
      .then(res => {
        localStorage.removeItem('token');
        setLoggedIn(false);
      })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <Router>
    <div className="App">
      <ul>
        { (!isLoggedIn) ? (<li> <Link to='/login'>Login</Link></li>) : (<div></div>) }
        <li>
          <Link to ='#' onClick={logout}>Logout</Link>
        </li>
        { (isLoggedIn) ? (<li> <Link to='/friends'>Friends Page</Link></li>) : (<div></div>) }
      </ul>

      <Switch>
        <PrivateRoute exact path='/friends' component={FriendList}/>
        <Route path='/login' render={(props) => {
          return <Login {...props} setLoggedIn={setLoggedIn} />
        }} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
