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

const App = () => {

  const [user, setUser] = useState()

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
        <div className="App container-fluid d-block mb-5 p-5">
          
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/register' component={Register}></Route>
              <Route exact path='/profile' component={Profile}></Route>
              <Route exact path='/learn' component={Learn}></Route>
              <Route exact path='/words' component={AllWords}></Route>
            </Switch>

        <Footer/>
      </div>
      </Router>
    </>
  );
}

export default App;
