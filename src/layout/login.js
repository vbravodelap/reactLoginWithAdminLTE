import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';

export default function Login({ login, mostrarError }) {
    const [usuario, setUsuario]= useState({
        email: '',
        password: ''
    });

    function HandleInputChange(e) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })

    }

    async function handleSubmit(e) {
        e.preventDefault();

        try{
            await login(usuario.email, usuario.password); 
        }catch(err) {
            swal.fire({
                title: 'Error!',
                text: err.response.data.message,
                icon: 'error'
            });
        }
    }

    useEffect(() => {
        document.body.className = 'hold-transition login-page';
    }, []);

    return(
        <div className="login-box">
            <div className="login-logo">
                <Link to="/"><b>Control</b>Gastos</Link>
            </div>
            {/* /.login-logo */}
            <div className="login-box-body">
                <p className="login-box-msg">Entra para iniciar tu sesión</p>
                <form onSubmit={handleSubmit}>
                <div className="form-group has-feedback">
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email"
                        required
                        name="email"
                        onChange={HandleInputChange}
                    />
                    <span className="glyphicon glyphicon-envelope form-control-feedback" />
                </div>
                <div className="form-group has-feedback">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Contraseña"
                        required
                        name="password"
                        onChange={HandleInputChange}
                    />
                    <span className="glyphicon glyphicon-lock form-control-feedback" />
                </div>
                <div className="row">
                    {/* /.col */}
                    <div className="col-xs-4 col-xs-offset-4">
                    <button type="submit" className="btn btn-primary btn-block btn-flat">Entrar</button>
                    </div>
                    {/* /.col */}
                </div>
                </form>
                <div style={{marginTop: 15 + 'px'}} className="text-center">
                   <Link to="/">No recuerdo mi contraseña</Link><br />
                </div>
                
            </div>
            {/* /.login-box-body */}
        </div>

    )
}