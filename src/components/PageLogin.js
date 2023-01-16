import React, { Component } from "react";
import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class PageLogin extends Component {
  state = {
    form: {
      name:'',
      pwd:''
    }
  }

  handleChange = async e => {  
    await this.setState({   
      form: {
        ...this.state.form, 
        [e.target.name]:e.target.value  
      }
    })
    console.log(this.state.form);  
  }

  iniciarSesion = async()=>{
    let name=this.state.form.name
    let pwd=this.state.form.pwd
    if(name === '' || pwd === ''){
      alert('Se requieren todos los datos')
      return 'Datos vacios'
    }

    await axios.get(process.env.REACT_APP_USUARIOS+"/"+name+"/"+pwd)
      .then(response=>{
        return response.data
      }).then(response=>{
          console.log(response)
        if(response){
          cookies.set("_id",response._id,{path:"/"})
          cookies.set("usu_email",response.usu_email,{path:"/"})
          cookies.set("usu_nombres",response.usu_nombres,{path:"/"})
          cookies.set("usu_apellidos",response.usu_apellidos,{path:"/"})
          cookies.set("per_id",response.per_id,{path:"/"})
          alert("Bienvenid@ "+response.usu_nombres)
          this.setState()
          window.location.href='./PageInicio'
        }else{
        }
      })
      .catch(error=>{
        alert("Verificar usuario y/o contraseña")
        console.log(error)
      })
  }

  render() {
    return (
      <div className="containerPrincipal">
      <div className="containerSecundario">
        <div className="form-group">
          <h1>Bienvenido!</h1>
          <h8>Ir a marcadores deportivos</h8>
          <br />
          <br />
        <label>Usuario</label>
        <br />
        <input
            type="text"
            className="form-control"
            name="name"
            onChange={this.handleChange}
          />
          <br />
          <label>Contraseña</label>
        <br />
        <input
            type="password"
            className="form-control"
            name="pwd"
            onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary"onClick={()=> this.iniciarSesion()}>Iniciar sesión</button>
      </div>
      </div>
      </div>
    );
  }
}

export default PageLogin;