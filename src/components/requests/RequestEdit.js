import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../../layout/content";
import Axios from "axios";
import Swal from "sweetalert2";

export default function RequestEdit() {
  const [solicitud, setSolicitud] = useState({
    concept: '',
    amount: '',
    description: ''
  });

  const { requestId } = useParams();

  useEffect(() => {
    Axios.get("http://localhost:3001/api/request/" + requestId)
      .then(res => {
        setSolicitud({
          concept: res.data.concept,
          description: res.data.description,
          amount: res.data.amount
        });
      })
      .catch(err => {
        Swal.fire({
          title: "Error!",
          text: "Error al encontrar la solicitud, intenta mas tarde!",
          icon: "error"
        });
      });
      // eslint-disable-next-line
  }, []);

  function handleInputChange(e) {
    setSolicitud({
      ...solicitud,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    Axios.put('http://localhost:3001/api/request/update/' + requestId, solicitud)
      .then(res => {

        setSolicitud({
          concept: res.data.updatedRequest.concept,
          description: res.data.updatedRequest.description,
          amount: res.data.updatedRequest.amount
        });

        Swal.fire({
          title: "Correcto",
          text: "La solicitud fue actualizada correctamente!",
          icon: "success"
        });
        document.getElementById("form-request-save").reset();
      })
      .catch(err => {
        console.log(err.response);
        Swal.fire({
          title: "Error",
          text: "La solicitud no fue actualizada correctamente!",
          icon: "error"
        });
      });
  }

  return (
    <Content pageHeader="Editar solicitud">
      <div className="col-md-12">
        <div className="box box-info">
          <form onSubmit={handleSubmit} id="form-request-save">
            <div className="box-body">
              <div className="col-md-4 form-group">
                <label>Concepto: </label>
                <input
                  defaultValue={solicitud.concept}
                  type="text"
                  className="form-control"
                  onChange={handleInputChange}
                  name="concept"
                  required
                />
              </div>

              <div className="col-md-4 form-group">
                <label>Descripción: </label>
                <input
                  type="text"
                  defaultValue={solicitud.description}
                  className="form-control"
                  onChange={handleInputChange}
                  name="description"
                  required
                />
              </div>

              <div className="col-md-4 form-group">
                <label>Cantidad: </label>
                <input
                  type="number"
                  defaultValue={solicitud.amount}
                  className="form-control"
                  onChange={handleInputChange}
                  name="amount"
                  required
                />
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
  );
}
