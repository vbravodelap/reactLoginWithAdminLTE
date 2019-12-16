import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Content from '../../layout/content';
import Axios from 'axios';
import swal from 'sweetalert2';
import ReactToExcel from 'react-html-table-to-excel';



export default function UsersIndex() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/users')
            .then(res => {
                setUsers(res.data.users);
            })
            .catch(err=> {
                swal('Error al traer los usuarios del servidor', '','error');
            });
    }, []);

    async function deleteUser(id) {

        swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esta acción!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                Axios.delete('http://localhost:3001/api/user/' + id).then(res => {
                    swal.fire({
                        title: 'Correcto!',
                        text: 'El usuario se elimino creo correctamente',
                        icon: 'success'
                    });
                    window.location.reload(true);
                }).catch(err => {
                    swal.fire({
                        title: 'Error!',
                        text: 'El usuario no se elimino correctamente',
                        icon: 'error'
                    });
                });
            }
        });
    }

    return(
        <Content pageHeader="Administración de usuarios">
            <div className="col-lg-12">
                <div className="box box-info">
                    <div className="box-header">
                        <Link to="/user/create" className="btn btn-primary">
                            <i className="fa fa-user-plus"></i><span style={{marginLeft: 10 + 'px'}}>Agregar usuario</span>
                        </Link>

                        &nbsp;

                        <ReactToExcel 
                            id="text-table"
                            className="btn btn-warning"
                            table="users-table"
                            filename="users"
                            sheet="users"
                            buttonText="Excel"
                        />
                    </div>
                    <div className="box-body table-responsive">
                        <table id="users-table" className="table table-bordered table-hover table-striped">
                            <thead>
                                <tr>
                                    <th className="col-md-3">Nombre</th>
                                    <th className="col-md-3">Email</th>
                                    <th className="col-md-1">Solicitado</th>
                                    <th className="col-md-1">Comprobado</th>
                                    <th className="col-md-1"></th>
                                    <th className="col-md-1"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user, i) => (
                                    <tr key={i}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.requested} $</td>
                                        <td>{user.checked} $</td>
                                        <td className="text-center">
                                            <Link className="btn btn-primary" to={`/user/edit/${user._id}`}><i className="fa fa-user"></i>&nbsp;Editar</Link>
                                            
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-danger" onClick={() => deleteUser(user._id)}><i className="fa fa-user-times"></i>&nbsp;Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Content>
    )
}