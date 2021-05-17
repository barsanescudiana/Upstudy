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
        <div className="App container-fluid d-flex orientation-vertical">
        <header>
          <div>
            <Switch>
              <Route exact path='/home' component={Home}></Route>
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/register' component={Register}></Route>
            </Switch>
          </div>
        </header>
        <Footer/>
      </div>
      </Router>
    </>
  );
}

export default App;
