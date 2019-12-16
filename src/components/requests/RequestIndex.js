import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Content from '../../layout/content';
import Axios from 'axios';
import Swal from 'sweetalert2';

export default function RequestIndex() {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/requests').then(res => {
            setSolicitudes(res.data.requests);
        }).catch(err => {
            Swal.fire({
                title: 'Error',
                text: 'Error al cargar la solicitudes, intenta mas tarde',
                icon: 'error'
            })
        })
    }, []);

    function deleteSolicitud(id) {

        Swal.fire({
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
                 Axios.delete('http://localhost:3001/api/request/' + id).then(res => {
                    console.log(res);
                    Swal.fire({
                        title: 'Correcto!',
                        text: 'La solicitud se elimino correctamente!',
                        icon: 'success'
                    });
                    window.location.reload(true);
                }).catch(err => {
                    console.log(err);
                    Swal.fire({
                        title: 'Error',
                        text: 'La solicitud no se elimino correctamente',
                        icon: 'error'
                    });
                });
            }
        });
    }

    return(
        <Content pageHeader="Listado de solicitudes">
            <div className="col-md-12">
                <div className="box box-info">
                    <div className="box-header">
                        <Link className="btn btn-primary" to="/request/create">
                            <i className="fa fa-pencil-square-o"></i>
                            &nbsp;Agregar solicitud
                        </Link>
                    </div>
                    <div className="box-body table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Concepto</th>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th>Status</th>
                                    <th className="col-md-1"></th>
                                    <th className="col-md-1"></th>
                                    <th className="col-md-1"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {solicitudes.map((solicitud, i) => (
                                    <tr key={i}>
                                        <td>{solicitud.user ? solicitud.user.name : 'sin datos'}</td>
                                        <td>{solicitud.concept}</td>
                                        <td>{solicitud.description}</td>
                                        <td>{solicitud.amount} $</td>
                                        <td>{solicitud.status}</td>
                                        <td className="text-center">
                                            <Link className="btn btn-primary" to={`/request/edit/${solicitud._id}`}><i className="fa fa-user"></i>&nbsp;Editar</Link>
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-danger" onClick={() => deleteSolicitud(solicitud._id)}><i className="fa fa-user-times"></i>&nbsp;Eliminar</button>
                                        </td>
                                        <td>
                                            <Link to={`/checkup/store/${solicitud._id}`} className="btn btn-warning"><i className="fa fa-check"/>&nbsp;Comprobar</Link>
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