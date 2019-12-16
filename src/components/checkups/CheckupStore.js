import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../../layout/content";
import Axios from "axios";
import Swal from "sweetalert2";

export default function CheckupStore() {
  const { requestId } = useParams();
  const [error, setError] = useState(null);
  const [solicitud, setSolicitud] = useState({
    id: "",
    amount: "",
    description: "",
    concept: ""
  });

  const [comprobacion, setComprobacion] = useState({
    amount: ""
  });

  useEffect(() => {
    console.log(requestId);
    Axios.get(`http://localhost:3001/api/request/${requestId}`)
      .then(res => {
        setSolicitud({
          id: res.data._id,
          amount: res.data.amount,
          description: res.data.description,
          concept: res.data.concept
        });
      })
      .catch(err => {
        console.log(err);
      });

    // eslint-disable-next-line
  }, []);

  function handleInputChange(e) {
    setComprobacion({
      ...comprobacion,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    Axios.post(
      `http://localhost:3001/api/checkup/store/${requestId}`,
      comprobacion
    )
      .then(res => {
        Swal.fire({
          title: "Correcto!",
          text: "La comprobación se realizo correctamente",
          icon: "success"
        });

        document.getElementById("comprobacion-create").reset();
      })
      .catch(err => {
        setError(err.response.data.message);
      });
  }

  return (
    <Content pageHeader="Crear comprobación">
      <div className="col-md-12">
        {error ? (
          <div className="alert alert-danger alert-dismissible"> {error} </div>
        ) : (
          ""
        )}
        <div className="box box-info">
          <div className="box-header">
            <h3 className="box-title">
              Solicitud numero:
              <span className="text-bold">&nbsp;{solicitud.id}</span>
            </h3>
          </div>
          <form onSubmit={handleSubmit} id="comprobacion-create">
            <div className="box-body">
              <div className="form-group col-md-6">
                <label>Solicitud: </label>
                <input
                  name="request"
                  id="request"
                  type="text"
                  className="form-control"
                  disabled
                  defaultValue={solicitud.id}
                />
              </div>

              <div className="form-group col-md-6">
                <label>Concepto: </label>
                <input
                  type="text"
                  defaultValue={solicitud.concept}
                  disabled
                  className="form-control"
                />
              </div>

              <div className="form-group col-md-6">
                <label>Cantidad pendiente: </label>
                <input
                  type="number"
                  className="form-control"
                  name="pendingAmount"
                  disabled
                  defaultValue={solicitud.amount}
                />
              </div>

              <div className="form-group col-md-6">
                <label>Cantidad a comprobar: </label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="box-footer">
              <button type="submit" className="btn btn-primary col-md-offset-5">
                Comprobar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Content>
  );
}
