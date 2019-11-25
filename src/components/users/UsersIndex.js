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
    }, [])

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
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Solicitado</th>
                                    <th>Comprobado</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user, i) => (
                                    <tr key={i}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.requested} $</td>
                                        <td>{user.checked} $</td>
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