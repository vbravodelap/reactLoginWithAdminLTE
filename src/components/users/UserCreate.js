import React, { useState } from 'react';
import Content from '../../layout/content';
import Axios from 'axios';
import swal from 'sweetalert2';

export default function UserCreate() {
    const [usuario, setUsuario] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });

    function handleInputChange(e) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await Axios.post('http://localhost:3001/api/user/store', usuario).then(res => {
            swal(`El usuario fue creado correctamente`, '', 'success');
            document.getElementById('user-create-form').reset();
        }).catch(err => {
            swal('Error al crear el usuario', 'Vuelve a intentar', 'error');
        })
    }
    
    return(
        <Content pageHeader="Crear usuario">
            <div className="col-lg-12">
                <div className="box box-info">
                    <div className="box-body">
                        <form onSubmit={handleSubmit} id="user-create-form">
                            <div className="row">
                                <div className="col-lg-3 form-group">
                                    <label>Nombre completo: </label>
                                    <input type="text" name="name" required className="form-control" onChange={handleInputChange}/>
                                </div>

                                <div className="col-lg-3 form-group">
                                    <label>Correo electronico: </label>
                                    <input type="email" name="email" required className="form-control" onChange={handleInputChange}/>
                                </div>

                                <div className="col-lg-3 form-group">
                                    <label>Username: </label>
                                    <input type="text" name="username" required className="form-control" onChange={handleInputChange}/>
                                </div>

                                <div className="col-lg-3 form-group">
                                    <label>Contraseña: </label>
                                    <input type="password" name="password" className="form-control" required onChange={handleInputChange}/>
                                </div>  
                            </div>

                            <div className="box-footer">
                                <button type="submit" className="btn btn-primary col-lg-offset-5">Guardar</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Content>
    )
}