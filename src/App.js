import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setToken, deleteToken, getToken, initAxiosInterceptors } from './helpers/auth-helpers';
import Axios from 'axios';

// Componentes
import Header from './layout/header';
import Sidebar from './layout/sidebar';
import Footer from './layout/footer';
import Login from './layout/login';
import UsersIndex from './components/users/UsersIndex';
import UserCreate from './components/users/UserCreate';
import UserEdit from './components/users/UserEdit';
import UserProfile from './components/users/UserProfile';
import RequestCreate from './components/requests/RequestCreate';
import RequestIndex from './components/requests/RequestIndex';
import RequestEdit from './components/requests/RequestEdit';
import CheckupStore from './components/checkups/CheckupStore';

initAxiosInterceptors();

export default function App() {
const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function cargarUsuario() {
      if(!getToken()) {
        return;
      }

      try {
        const { data } = await Axios.get('http://localhost:3001/api/user/whoiam');
        setUsuario(data.user);
      }catch(err) {
        console.log(err);
      }
    }

    cargarUsuario();
  }, []);

  async function login(email, password) {
    const { data } = await Axios.post('http://localhost:3001/api/user/login', {email, password});   
    setUsuario(data.user);
    setToken(data.token);
  }

  async function logout() {
    setUsuario(null);
    window.location = '/login';
    deleteToken();
  }

  return (
    <Router>
      { usuario ? <LoginRoutes usuario={usuario}  logout={logout}/> : <LogoutRoutes login={login} /> }
    </Router>
  );
}

function LogoutRoutes({ login }) {
  return(
    <Login login={login} />
  )
}

function LoginRoutes({ usuario, logout }) {
  useEffect(() => {
    document.body.className = 'hold-transition skin-blue sidebar-mini';
  }, []);

  return(
    <div>
      <Header usuario={usuario} logout={logout}/>
      <Sidebar usuario={usuario}/>
        <div className="content-wrapper">
          <UserRoutes />
          <RequestRoutes />
          <CheckupRoutes />
        </div>
      <Footer />
    </div>
    
  )
}

function UserRoutes() {
  return(
    <div>
        <Switch> 
          <Route 
            path="/users"
            render={props => (
              <UsersIndex {...props} />
            )}
          />

          <Route 
            path="/user/create"
            render={props => (
              <UserCreate {...props} />
            )}
          />

          <Route 
            path="/user/edit/:userId"
            render={props => (
              <UserEdit {...props}/>
            )}
          />

          <Route
            path="/user/:userId"
            render={props => (
              <UserProfile {...props}/>
            )}
          />
        </Switch>
    </div>
  )
}

function RequestRoutes() {
  return(
    <div>
        <Switch>
          <Route 
            path="/request/create"
            render={props => (
              <RequestCreate {...props} />
            )}
          />

          <Route
            path="/request/index"
            render={props => (
              <RequestIndex {...props} />
            )}
          />

          <Route 
            path="/request/edit/:requestId"
            render={props => (
              <RequestEdit {...props} />
            )}
          />

        </Switch>
    </div>
  )
}

function CheckupRoutes() {
  return(
    <div>
      <Switch>
        <Route 
          path="/checkup/store/:requestId"
          render={props => (
            <CheckupStore {...props} />
          )}
        />
      </Switch>
    </div>
  );
}

