import React, { Component } from "react";
import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";

class PageRegistro extends Component {

  state = {
    form: {
      usu_id:'',
      usu_email:'',
      usu_clave: '',
      usu_nombres: '',
      usu_apellidos: '',
      per_id:'',
      repwd:''
    },

    repwd2:''

  }

  handleChange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  registrarUsuario = async () => {
    const usu_nombres = this.state.form.usu_nombres
    const usu_apellidos = this.state.form.usu_apellidos
    const usu_email = this.state.form.usu_email
    const usu_clave = this.state.form.usu_clave
    this.setState({repwd2:this.state.form.repwd})
    if (usu_nombres === '' || usu_apellidos ==='' || usu_email ==='' || usu_clave === '') {
      alert('Se requieren todos los datos')
      return "Datos Vacios"
    }

    if (usu_clave !== this.state.repwd2) {
      alert('Las contraseñas no coinciden')
      return "Contraseñas no coinciden"
    }

    await axios.get(process.env.REACT_APP_USUARIOS+"/"+usu_nombres+"/"+usu_clave)
    .then(response => {
        alert('El usuario ya existe')
        return "El usuario ya existe"
    }).catch(error => {
      this.peticionPost();
    })

  }

  peticionPost = () => {
    delete this.state.form._id
    delete this.state.form.repwd
    axios.post(process.env.REACT_APP_USUARIOS, this.state.form).then(response => {
      alert('Gracias por registrarse')
      window.location.href = './PageLogin'
    }).catch(error => {
        alert("Usuario ya existe")
        this.setState({form:{...this.state.form,repwd:this.state.repwd2}})
    })
  }


  render() {
    return (
      <div className="containerPrincipal">
      <div className="containerSecundario">
        <div className="form-group">


        <label>Nombres</label>
        <input
            type="text"
            className="form-control"
            name="usu_nombres"
            id="usu_nombres"
            onChange={this.handleChange}
          />
          <br />

        <label>Apellidos</label>
        <input
            type="text"
            className="form-control"
            name="usu_apellidos"
            id="usu_apellidos"
            onChange={this.handleChange}
            />
            <br />

            <label>Email</label>
        <input
            type="email"
            className="form-control"
            name="usu_email"
            id="usu_email"
            onChange={this.handleChange}
            />
            <br />

            <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="usu_clave"
                id="usu_clave"
                onChange={this.handleChange}
              />
              <br />

            <label>Ingrese nuevamente la contraseña</label>
            <br/>
        <input
            type="password"
            className="form-control"
            name="repwd"
            onChange={this.handleChange}
            />
            <br/>

            <button className="btn btn-primary"onClick={()=> this.registrarUsuario()}>Registrarse</button>
      </div>
      </div>
      </div>
    );
  }
}

export default PageRegistro;