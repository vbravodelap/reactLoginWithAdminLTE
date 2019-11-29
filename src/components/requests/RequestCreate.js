import React, { useState } from 'react';
import Content from '../../layout/content';
import Axios from 'axios';
import Swal from 'sweetalert2';

export default function RequestCreate() {
    const [solicitud, setSolicitud] = useState({
        concept: '',
        description: '',
        amount: ''
    });

    function handleInputChange(e) {
        setSolicitud({
            ...solicitud,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        Axios.post('http://localhost:3001/api/request/store', solicitud).then(res => {
            Swal.fire({
                title: 'Correcto',
                text: 'La solicitud fue creado correctamente!',
                icon: 'success'
            });
            document.getElementById('form-request-save').reset();
        }).catch(err => {
            Swal.fire({
                title: 'Error',
                text: 'La solicitud no fue creado correctamente!',
                icon: 'error'
            });
        });
    }
    
    return(
        <Content pageHeader="Crear una solicitud de fondos">
            <div className="col-md-12">
                <div className="box box-info">
                    <form onSubmit={handleSubmit} id="form-request-save">
                        <div className="box-body">
                            <div className="col-md-4 form-group">
                                <label>Concepto: </label>
                                <input type="text" className="form-control" onChange={handleInputChange} name="concept" required/>
                            </div>

                            <div className="col-md-4 form-group">
                                <label>Descripción: </label>
                                <input type="text" className="form-control" onChange={handleInputChange} name="description" required/>
                            </div>

                            <div className="col-md-4 form-group">
                                <label>Cantidad: </label>
                                <input type="number" className="form-control" onChange={handleInputChange} name="amount" required/>
                            </div>
                        </div>

                        <div className="box-footer">
                            <button className="btn btn-primary col-md-offset-5" type="submit">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Content>
    )
}