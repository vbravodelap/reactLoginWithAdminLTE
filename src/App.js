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
import swal from 'sweetalert';
import UsersIndex from './components/users/UsersIndex';
import UserCreate from './components/users/UserCreate';

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
    deleteToken();
  }

  function mostrarError(mensaje, data, tipoError){
    swal(mensaje, data, tipoError);
  }

  return (
    <Router>
      { usuario ? <LoginRoutes usuario={usuario}  logout={logout}/> : <LogoutRoutes login={login} mostrarError={mostrarError}/> }
    </Router>
  );
}

function LogoutRoutes({ login, mostrarError }) {
  return(
    <Login login={login} mostrarError={mostrarError}/>
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

        </Switch>
      </div>
      <Footer />
    </div>
  )
}

