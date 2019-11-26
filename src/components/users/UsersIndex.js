import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Content from '../../layout/content';
import Axios from 'axios';
import swal from 'sweetalert';



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
        alert(id)
    }

    return(
        <Content pageHeader="Administración de usuarios">
            <div className="col-lg-12">
                <div className="box box-info">
                    <div className="box-header">
                        <div className="col-lg-4">
                            <Link to="/user/create" className="btn btn-primary">
                                <i className="fa fa-user-plus"></i><span style={{marginLeft: 10 + 'px'}}>Agregar usuario</span>
                            </Link>
                        </div>
                    </div>
                    <div className="box-body table-responsive">
                        <table className="table table-bordered table-hover table-striped">
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