import React, { Component } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap/js/dist/dropdown'

import Cookies from "universal-cookie";
const cookies = new Cookies();

class MenuInicial extends Component {

  state = {
    usuadmin: false,
    stateLogin: false,
  }

  componentDidMount() {

    if (cookies.get("usu_nombres")) {
      this.setState({ stateLogin: true })
    } else {
      this.setState({ stateLogin: false })

    }
    console.log(this.state.stateLogin)
    if (cookies.get("per_id") === process.env.REACT_APP_IDADMIN) {
      this.setState({ usuadmin: true })
    }
    else {
      this.setState({ usuadmin: false })
    }
  }

  cerrarSesion() {
    cookies.remove("usu_id", { path: "/" })
    cookies.remove("usu_email", { path: "/" })
    cookies.remove("usu_nombres", { path: "/" })
    cookies.remove("usu_apellidos", { path: "/" })
    cookies.remove("per_id", { path: "/" })
    //window.location.href="./"
    this.setState({ stateLogin: false })
    this.setState({ usuadmin: false })
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="./Logo2.png" alt="logo" width="100" />
          </Link>
          <div className="marcador"><h1>Marcadores deportivos 2022</h1></div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">

              <li className="nav-item"
              hidden={this.state.stateLogin}>
                <Link className="nav-link active"
                  to="/PageInicio">
                  Inicio
                </Link>
              </li>

              <li className="nav-item"
                hidden={this.state.stateLogin}>
                <Link className="nav-link"
                  to="/PageLogin">
                  login
                </Link>
              </li>

              <li className="nav-item"
                hidden={this.state.stateLogin}>
                <Link className="nav-link"
                  to="/PageRegistro">
                  Registrarse
                </Link>
              </li>

              <li className="nav-item"
                hidden={!this.state.usuadmin}>
                <Link className="nav-link"
                  to="/PageUsuarios">
                  Usuarios
                </Link>
              </li>

              <li className="nav-item"
                hidden={!this.state.stateLogin}>
                <Link className="nav-link"
                  to="/PageEventos">
                  Eventos
                </Link>
              </li>

              <li className="nav-item"
                hidden={!this.state.usuadmin}>
                <Link className="nav-link"
                  to="/PageDeportes">
                  Deportes
                </Link>
              </li>

              <li className="nav-item"
                hidden={!this.state.usuadmin}>
                <Link className="nav-link"
                  to="/PageEquipos">
                  Equipos
                </Link>
              </li>

              <li className="nav-item"
                hidden={!this.state.stateLogin}>
                <Link className="nav-link"
                  onClick={() => this.cerrarSesion()}
                  to="/PageInicio">
                  Salir
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default MenuInicial;