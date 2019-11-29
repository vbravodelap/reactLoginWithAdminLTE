import React, { useEffect, useState } from 'react';
import Content from '../../layout/content';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import swal from 'sweetalert2';

export default function UserProfile() {
    const { userId } = useParams();
    const [usuario, setUsuario] = useState({
        name: '',
        surname: '',
        email: ''
    });

    useEffect(() => {
        Axios.get('http://localhost:3001/api/user/' + userId).then(res => {
            setUsuario({
                name: res.data.user.name,
                username: res.data.user.username,
                email: res.data.user.email
            });
        }).catch(err => {
            swal.fire({
                title: 'Error',
                text: 'Error al encontrar el usuario intente de nuevo refrescando la pagina',
                icon: 'error'
            });
        });
        // eslint-disable-next-line
    }, []);

    function handleInputChange(e) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await Axios.put('http://localhost:3001/api/user/update/' + userId, usuario).then(res => {
            swal.fire({
                title: 'Correcto!',
                icon: 'success',
                text: 'El usuario se actualizo corretamente!'
            });
            setUsuario({
                name: res.data.user.name,
                username: res.data.user.username,
                email: res.data.user.email
            });
        }).catch(err => {
            swal.fire({
                title: 'Error',
                text: 'No se ha podido actualizar el usuario',
                icon: 'error'
            })
        });
    }

    return(
        <Content pageHeader="Mi perfil">
            <div className="col-lg-12">
                <div className="box box-info">
                    <div className="box-body">
                        <form onSubmit={handleSubmit} id="user-create-form">
                            <div className="row">
                                <div className="col-lg-4 form-group">
                                    <label>Nombre completo: </label>
                                    <input type="text" defaultValue={usuario.name} name="name" onChange={handleInputChange} required className="form-control"/>
                                </div>

                                <div className="col-lg-4 form-group">
                                    <label>Correo electronico: </label>
                                    <input type="email" defaultValue={usuario.email} name="email" onChange={handleInputChange} required className="form-control"/>
                                </div>

                                <div className="col-lg-4 form-group">
                                    <label>Username: </label>
                                    <input type="text" defaultValue={usuario.username} name="username" onChange={handleInputChange} required className="form-control"/>
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
    );
}