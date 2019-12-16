import React, { useState, useEffect } from "react";
import Content from "../../layout/content";
import Axios from "axios";
import swal from "sweetalert2";
import $ from 'jquery'; 

export default function UserCreate() {
  useEffect(() => {
    $(document).ready(function() {
     
    })
  })

  const [usuario, setUsuario] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await Axios.post("http://localhost:3001/api/user/store", usuario)
      .then(res => {
        swal.fire({
          title: "Correcto!",
          text: "El usuario se creo correctamente",
          icon: "success"
        });
        document.getElementById("user-create-form").reset();
      })
      .catch(err => {
        swal.fire({
          title: "Error!",
          text: "El usuario no se creo correctamente",
          icon: "error"
        });
      });
  }

  return (
    <Content pageHeader="Crear usuario">
      <div className="col-lg-12">
        <div className="box box-info">
          <div className="box-body">
            <form onSubmit={handleSubmit} id="user-create-form">
              <div className="row">
                <div className="col-lg-3 form-group">
                  <label>Nombre completo: </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-lg-3 form-group">
                  <label>Correo electronico: </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-lg-3 form-group">
                  <label>Username: </label>
                  <input
                    type="text"
                    name="username"
                    required
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-lg-3 form-group">
                  <label>Contraseña: </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-3 form-group">
                  <label>Fecha de ingreso: &nbsp;</label>
                  <input type="text" id="entryDate"/> 
                </div>
              </div>

              <div className="box-footer">
                <button
                  type="submit"
                  className="btn btn-primary col-lg-offset-5"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Content>
  );
}
