import React, { useEffect, useState } from 'react';
import './App.scss';
import Login from './pages/Login';
import Register from './pages/Register'
import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Learn from './pages/Learn';
import AllWords from './pages/AllWords';
import Success from './pages/Success';
import Reading from './pages/Reading';
import Tests from './pages/Tests';
import Revision from './pages/Revision';

const App = () => {

  const [, setUser] = useState()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <>
      <Router>
        <div className="App d-grid mb-5 p-5 justify-content-center align-items-center">
          
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/register' component={Register}></Route>
              <Route exact path='/profile' component={Profile}></Route>
              <Route exact path='/learn' component={Learn}></Route>
              <Route exact path='/words' component={AllWords}></Route>
              <Route exact path='/success' component={Success}></Route>
              <Route path='/reading/:title' component={Reading}></Route>
              <Route exact path='/test' component={Tests}></Route>
              <Route exact path='/revision' component={Revision}></Route>
            </Switch>

        <Footer/>
      </div>
      </Router>
    </>
  );
}

export default App;
