import React, { Component } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class PageUsuarios extends Component {

    state = {
        data: [],
        data2:[],
        modalInsertar: false,
        modalEliminar: false,
        tipoModal: '',
        form: {
            _id: '',
            usu_id:'',
            usu_email: '',
            usu_clave: '',
            usu_nombres: '',
            usu_apellidos: '',
            per_id:''
        },
        form2:{
            _id:'',
            per_nombre:''
        }
    };

    peticionGet = () => {
        axios.get(process.env.REACT_APP_USUARIOS).then((response) => {
            this.setState({ data: response.data });
        })
            .catch(error => {
                console.log(error.message)
            })
    };

    peticionGet2 = () => {
        axios.get(process.env.REACT_APP_PERMISOS).then((response) => {
            console.log(response.data);
            this.setState({ data2: response.data });
        })
            .catch(error => {
                console.log(error.message)
            })
    };

    peticionPost = async () => {
        delete this.state.form._id
        await axios.post(process.env.REACT_APP_USUARIOS, this.state.form).then((response) => {
            this.modalInsertar() 
            this.peticionGet()
        })
            .catch(error => {
                console.log(error.message)
            })
    }

    peticionPut = () => {
        console.log(process.env.REACT_APP_USUARIOS + '/' + this.state.form._id)
        axios.put(process.env.REACT_APP_USUARIOS + '/' + this.state.form._id, this.state.form)
            .then((response) => {
                this.modalInsertar() 
                this.peticionGet()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    peticionDelete = () => {
        console.log(process.env.REACT_APP_USUARIOS + '/'  + this.state.form._id)
        axios.delete(process.env.REACT_APP_USUARIOS + '/' + this.state.form._id, this.state.form)
            .then((response) => {
                this.modalEliminar() 
                this.peticionGet()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    seleccionarUsuario = (usuario) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                _id: usuario._id,
                usu_id:usuario.usu_id,
                usu_email: usuario.usu_email,
                usu_clave: usuario.usu_clave,
                usu_nombres: usuario.usu_nombres,
                usu_apellidos: usuario.usu_apellidos,
                per_id:usuario.per_id
            }
        })
    }

    seleccionarPermiso = (rol) => {
        this.setState({
            form2:{
                _id:rol._id,
                per_nombre:rol.per_nombre
            }
            
        })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar })
    }

    modalEliminar = () => {
        this.setState({ modalEliminar: !this.state.modalEliminar })
    }
    

    
    handleChange = async e => {  
        e.persist();           
        await this.setState({   
            form: {
                ...this.state.form, 
                [e.target.name]: e.target.value  
            }
        });
        console.log(this.state.form);  
    }

    componentDidMount() {
        this.peticionGet();
        this.peticionGet2();
    }

    render() {

        const form = this.state.form

        return (
            <div className="App">
                <div className="table_title"><h1>Usuarios registrados</h1></div>
                <br />
                <table className="table ">
                <div className="containertabla">
                    <thead>
                        <tr>
                            <th className="td">ID</th>
                            <th hidden className="td">Id</th>
                            <th className="td">Email</th>
                            <th className="td">Clave</th>
                            <th className="td">Nombre</th>
                            <th className="td">Apellido</th>
                            <th className="td">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((usuario) => {
                            return (
                                <tr>
                                    <td className="td">{usuario._id}</td>
                                    <td hidden className="td">{usuario.usu_id}</td>
                                    <td className="td">{usuario.usu_email}</td>
                                    <td className="td">{usuario.usu_clave}</td>
                                    <td className="td">{usuario.usu_nombres}</td>
                                    <td className="td">{usuario.usu_apellidos}</td>
                                    <td>
                                        <button className="btn btn-primary">
                                            <FontAwesomeIcon icon={faEdit} onClick={() => { this.seleccionarUsuario(usuario); this.modalInsertar() }} />
                                        </button>
                                        {"  "}
                                        <button className="btn btn-danger">
                                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => { this.seleccionarUsuario(usuario); this.modalEliminar() }} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </div>
                </table>
                <div className="button-item">
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Usuario</button>
                </div>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>

                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <input
                                className="form-control"
                                type="hidden"
                                name="_id"
                                id="_id"
                                readOnly // Solo lectura
                                onChange={this.handleChange}
                                value={form ? form._id : this.state.data.length + 1}
                            ></input>
                            <input
                                className="form-control"
                                type="hidden"
                                name="usu_id"
                                id="usu_id"
                                onChange={this.handleChange}
                                value={form ? form.usu_id : ''}
                            ></input>
                            <br />
                            <label htmlFor="usu_email">Email</label>
                            <input
                                className="form-control"
                                type="text"
                                name="usu_email"
                                id="usu_email"
                                onChange={this.handleChange}
                                value={form ? form.usu_email : ''}
                            ></input>
                            <br />
                            <label htmlFor="usu_clave">Clave</label>
                            <input
                                className="form-control"
                                type="text"
                                name="usu_clave"
                                id="usu_clave"
                                onChange={this.handleChange}
                                value={form ? form.usu_clave : ''}
                            ></input>
                            <br />
                            <label htmlFor="usu_nombres">Nombres</label>
                            <input
                                className="form-control"
                                type="text"
                                name="usu_nombres"
                                id="usu_nombres"
                                onChange={this.handleChange}
                                value={form ? form.usu_nombres : ''}
                            ></input>
                            <br />
                            <label htmlFor="usu_apellidos">Apellidos</label>
                            <input
                                className="form-control"
                                type="text"
                                name="usu_apellidos"
                                id="usu_apellidos"
                                onChange={this.handleChange}
                                value={form ? form.usu_apellidos : ''}
                            ></input>
                            <br />

                            <label htmlFor="per_id">Rol</label>
                            <select class="form-select" 
                             name="per_id"
                             id="per_id"
                                value={form ? form.per_id : ''}
                                aria-label="Default select example" onChange={this.handleChange}>
                                <option selected>seleccionar</option>
                                {this.state.data2.map((rol) => {
                                    return (
                                        <option value={rol._id}>{rol.per_nombre}</option>
                                    );
                                })}
                            </select>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {
                            this.state.tipoModal === 'insertar' ?
                                <button className="btn btn-success" onClick={() => this.peticionPost()}>Insertar</button>
                                : <button className="btn btn-success" onClick={() => this.peticionPut()}>Modificar</button>
                        }
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estas segur@ que deseas eliminar?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Si</button>
                        <button className="btn btn-success" onClick={() => this.modalEliminar()}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default PageUsuarios;
