import React, { Component } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const date = new Date();
const year = date.getFullYear();
const day = date.getDate();
const month = date.getMonth() + 1;

class PageEventos extends Component {

    state = {
        usuadmin: false,
        data: [],
        data2: [],
        data3: [],
        fecha:'',
        time:'',
        modalInsertar: false,
        modalEliminar: false,
        tipoModal: '',
        form: {
            _id: '',
            dep_id: '',
            deporte:'',
            usu_id: '',
            usuario:'',
            mar_fechaEvento: '',
            mar_horaEvento: '',
            mar_fechaRegistro: '',
            mar_horaRegistro: '',
            equi_id: '',
            equipo1:'',
            equi_id2: '',
            equipo2:'',
            mar_marcadoresqui1: '',
            mar_marcadoresqui2: ''
        },
        form2: {
            _id: '',
            dep_nombre: ''
        },
        form3: {
            _id: '',
            equi_nombre: ''
        },

        stateLogin: false
    };

    cerrarSesion() {
        cookies.remove("usu_id", { path: "/" })
        cookies.remove("usu_email", { path: "/" })
        cookies.remove("usu_nombres", { path: "/" })
        cookies.remove("usu_apellidos", { path: "/" })
        cookies.remove("per_id", { path: "/" })

        this.setState({ stateLogin: false })
        this.setState({ usuadmin: false })
    }

    peticionGet2 = () => {
        axios.get(process.env.REACT_APP_DEPORTES).then((response) => {
            this.setState({ data2: response.data });

        })
            .catch(error => {
                console.log(error.message)
            })
    };

    peticionGet3 = () => {
        axios.get(process.env.REACT_APP_EQUIPOS).then((response) => {
            this.setState({ data3: response.data });

        })
            .catch(error => {
                console.log(error.message)
            })
    };

    seleccionarEquipos = (Equipos) => {
        this.setState({
            tipoModal: 'actualizar',
            form3: {
                _id: Equipos._id,
                equi_nombre: Equipos.equi_nombre
            }
        })
    }


    seleccionarDeportes = (Deportes) => {
        this.setState({
            tipoModal: 'actualizar',
            form2: {
                _id: Deportes._id,
                dep_nombre: Deportes.dep_nombre
            }
        })
    }

    peticionGet = () => {
        axios.get(process.env.REACT_APP_MARCADORES5).then((response) => {
            this.setState({ data: response.data });

        })
            .catch(error => {
                console.log(error.message)
            })
    };

    peticionPost = async () => {
        delete this.state.form._id
        delete this.state.form.deporte
        delete this.state.form.usuario
        delete this.state.form.equipo1
        delete this.state.form.equipo2
        console.log(this.state.form)
        await axios.post(process.env.REACT_APP_MARCADORES, this.state.form).then((response) => {
            this.modalInsertar() 
            this.peticionGet()
        })
            .catch(error => {
                console.log(error.message)
            })
    }

    peticionPut = () => {
        delete this.state.form.deporte
        delete this.state.form.usuario
        delete this.state.form.equipo1
        delete this.state.form.equipo2
        console.log(process.env.REACT_APP_MARCADORES + '/' + this.state.form._id)
        axios.put(process.env.REACT_APP_MARCADORES + '/' + this.state.form._id, this.state.form)
            .then((response) => {
                this.modalInsertar() 
                this.peticionGet()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    peticionDelete = () => {
        console.log(process.env.REACT_APP_MARCADORES + '/' + this.state.form._id)
        axios.delete(process.env.REACT_APP_MARCADORES + '/' + this.state.form._id, this.state.form)
            .then((response) => {
                this.modalEliminar() 
                this.peticionGet()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    seleccionarEvento = (evento) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                _id: evento._id,
                dep_id: evento.dep_id,
                deporte: evento.deporte,
                usu_id: evento.usu_id,
                usuario: evento.usuario,
                mar_fechaEvento: evento.mar_fechaEvento,
                mar_horaEvento: evento.mar_horaEvento,
                mar_fechaRegistro: evento.mar_fechaRegistro,
                mar_horaRegistro: evento.mar_horaRegistro,
                equi_id: evento.equi_id,
                equipo1: evento.equipo1,
                equi_id2: evento.equi_id2,
                equipo2: evento.equipo2,
                mar_marcadoresqui1: evento.mar_marcadoresqui1,
                mar_marcadoresqui2: evento.mar_marcadoresqui2
            }
        })
        this.setState({    
            fecha:evento.mar_fechaRegistro,
            time:evento.mar_horaRegistro
        })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar})
    }

    insertarFechaHora = () => {
        this.setState({
            fecha: `${year}-${month}-${day}`,
            time: date.toLocaleTimeString('it-IT')
        })
    }

    modalEliminar = () => {
        this.setState({ modalEliminar: !this.state.modalEliminar })
    }
    
    
    
    handleChange = async e => {  
        e.persist();           
        await this.setState({   
            form: {
                ...this.state.form, 
                mar_fechaRegistro: this.state.fecha,
                mar_horaRegistro: this.state.time,
                usu_id: cookies.get("_id"),
                [e.target.name]: e.target.value  
            }
        });
        console.log(this.state.form);
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

        this.peticionGet();
        this.peticionGet2();
        this.peticionGet3();

    }

    fechaActual = async () => {
        const date = new Date();
        const year = date.getFullYear();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const fecha = `"${year}-${month}-${day}"`
        console.log(fecha)
        const time = date.toLocaleTimeString('it-IT');
        await this.setState({ form: { mar_fechaRegistro: fecha, mar_horaRegistro: time } });
    }


    render() {

        const form = this.state.form

        return (
            <div className="App">
                <div className="table_title"><h1>Eventos registrados</h1>
                </div>
                <br />
                <table className="table ">
                    <div className="containertabla">
                        <thead>
                            <tr>
                                <th hidden={!this.state.usuadmin} className="td">ID</th>
                                <th className="td">Deporte</th>
                                <th hidden={!this.state.usuadmin} className="td">Usuario</th>
                                <th hidden={!this.state.usuadmin} className="td">Fecha Evento</th>
                                <th hidden={!this.state.usuadmin} className="td">Hora Evento</th>
                                <th hidden={!this.state.usuadmin} className="td">Fecha Registro</th>
                                <th hidden={!this.state.usuadmin} className="td">Hora Registro</th>
                                <th className="td">Equipo 1</th>
                                <th className="td">Marcador Equipo 1</th>
                                <th className="td">Equipo 2</th>
                                <th className="td">Marcador Equipo 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((evento) => {
                                return (
                                    <tr>
                                        <td hidden={!this.state.usuadmin} className="td">{evento._id}</td>
                                        <td className="td">{evento.deporte}</td>
                                        <td hidden={!this.state.usuadmin} className="td">{evento.usuario}</td>
                                        <td hidden={!this.state.usuadmin} className="td">{evento.mar_fechaEvento.slice(0, 10)}</td>
                                        <td hidden={!this.state.usuadmin} className="td">{evento.mar_horaEvento}</td>
                                        <td hidden={!this.state.usuadmin} className="td">{evento.mar_fechaRegistro.slice(0, 10)}</td>
                                        <td hidden={!this.state.usuadmin} className="td">{evento.mar_horaRegistro}</td>
                                        <td className="td">{evento.equipo1}</td>
                                        <td className="td">{evento.mar_marcadoresqui1}</td>
                                        <td className="td">{evento.equipo2}</td>
                                        <td className="td">{evento.mar_marcadoresqui2}</td>
                                        <td>
                                            <button className="btn btn-primary">
                                                <FontAwesomeIcon icon={faEdit} 
                                                hidden={!this.state.stateLogin} 
                                                onClick={() => { this.seleccionarEvento(evento); this.modalInsertar()}} />
                                            </button>
                                            {"  "}
                                            <button className="btn btn-danger">
                                                <FontAwesomeIcon icon={faTrashAlt} 
                                                hidden={!this.state.usuadmin} 
                                                onClick={() => { this.seleccionarEvento(evento); this.modalEliminar() }} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </div>
                </table>
                <div className="button-item">
                    <button className="btn btn-success" 
                    hidden={!this.state.usuadmin} 
                    onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); 
                    this.modalInsertar();this.insertarFechaHora() }}>Agregar Evento</button>
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
                                readOnly
                                onChange={this.handleChange}
                                value={form ? form._id : this.state.data.length + 1}
                            ></input>

                            <label htmlFor="dep_id" hidden={!this.state.usuadmin}>Deporte</label>
                            <select class="form-select"
                                name="dep_id"
                                id="dep_id"
                                hidden={!this.state.usuadmin}
                                value={form ? form.dep_id : ''}
                                aria-label="Default select example"
                                onChange={this.handleChange}>
                                <option selected >seleccionar</option>
                                {this.state.data2.map((Deportes) => {
                                    return (
                                        <option value={Deportes._id}>{Deportes.dep_nombre}</option>
                                    );
                                })}
                            </select>

                            <label htmlFor="mar_fechaEvento" hidden={!this.state.usuadmin}>Fecha Evento</label>
                            <input hidden={!this.state.usuadmin}
                                className="form-control"
                                type="date"
                                name="mar_fechaEvento"
                                id="mar_fechaEvento"
                                onChange={this.handleChange}
                                value={form ? form.mar_fechaEvento : ''}
                            ></input>

                            <label htmlFor="mar_horaEvento" hidden={!this.state.usuadmin}>Hora Evento</label>
                            <input hidden={!this.state.usuadmin}
                                className="form-control"
                                type="time"
                                name="mar_horaEvento"
                                id="mar_horaEvento"
                                onChange={this.handleChange}
                                value={form ? form.mar_horaEvento : ''}
                            ></input>

                            <label htmlFor="equi_id" hidden={!this.state.usuadmin}>Equipo 1</label>
                            <select class="form-select"
                                name="equi_id"
                                id="equi_id"
                                hidden={!this.state.usuadmin}
                                value={form ? form.equi_id : ''}
                                aria-label="Default select example"
                                onChange={this.handleChange}>
                                <option selected>seleccionar</option>
                                {this.state.data3.map((Equipos) => {
                                    return (
                                        <option value={Equipos._id}>{Equipos.equi_nombre}</option>
                                    );

                                })}
                            </select>

                            <label htmlFor="mar_marcadoresqui1">Marcador Equipo 1</label>
                            <input
                                className="form-control"
                                type="text"
                                name="mar_marcadoresqui1"
                                id="mar_marcadoresqui1"
                                onChange={this.handleChange}
                                value={form ? form.mar_marcadoresqui1 : ''}
                            ></input>

                            <label htmlFor="equi_id2" hidden={!this.state.usuadmin}>Equipo 2</label>
                            <select class="form-select"
                                name="equi_id2"
                                id="equi_id2"
                                hidden={!this.state.usuadmin}
                                value={form ? form.equi_id2 : ''}
                                aria-label="Default select example" onChange={this.handleChange}>
                                <option selected>seleccionar</option>
                                {this.state.data3.map((Equipos) => {
                                    return (
                                        <option value={Equipos._id}>{Equipos.equi_nombre}</option>
                                    );
                                })}
                            </select>

                            <label htmlFor="mar_marcadoresqui2">Marcador Equipo 2</label>
                            <input
                                className="form-control"
                                type="text"
                                name="mar_marcadoresqui2"
                                id="mar_marcadoresqui2"
                                onChange={this.handleChange}
                                value={form ? form.mar_marcadoresqui2 : ''}
                            ></input>

                            <br />
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

export default PageEventos;
