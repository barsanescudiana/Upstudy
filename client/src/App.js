import React, { useState } from 'react';
import './App.scss';
import Login from './components/Login';
import Register from './components/Register'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import axios from 'axios';
import { server } from './components/GlobalVariables'




const App = () => {

  const [user, setUser] = useState(null)

  const getUser = () => {
    axios.get(server + '/session', { withCredentials: true })
      .then((response) => {
        console.log(response.data.user)
        setUser(response.data.user)
        console.log(user)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  getUser()

  return (
    <>
      <Router>
        <div className="App d-flex flex-column justify-content-center align-items-center">
        <header>
          <div>
            <Switch>
              <Route exact path='/home'> 
                <Home user={user}/>;
              </Route>
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/register' component={Register}></Route>
            </Switch>
          </div>
        </header>

        { console.log(user) }

        <footer className='footer bg-dark d-flex flex-column align-items-center justify-content-center'>
              <img src={'./assets/logo-black.svg'} alt='Logo' className='logo position-relative align-center'></img> 
        </footer>
      </div>
      </Router>

      
    </>
  );
}

export default App;
