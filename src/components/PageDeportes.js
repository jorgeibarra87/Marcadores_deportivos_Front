import React, { Component } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class PageDeportes extends Component{

    
    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        tipoModal: '',
        form: {
            _id: '',
            dep_nombre: ''
        }
    };

    peticionGet = () => {
        axios.get(process.env.REACT_APP_DEPORTES).then((response) => {
            this.setState({ data: response.data });
        })
            .catch(error => {
                console.log(error.message)
            })
    };

    peticionPost = async () => {
        delete this.state.form._id
        await axios.post(process.env.REACT_APP_DEPORTES, this.state.form).then((response) => {
            this.modalInsertar() 
            this.peticionGet()
        })
            .catch(error => {
                console.log(error.message)
            })
    }

    peticionPut = () => {
        console.log(process.env.REACT_APP_DEPORTES + '/' + this.state.form._id)
        axios.put(process.env.REACT_APP_DEPORTES + '/' + this.state.form._id, this.state.form)
            .then((response) => {
                this.modalInsertar() 
                this.peticionGet()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    peticionDelete = () => {
        console.log(process.env.REACT_APP_DEPORTES + '/' + this.state.form._id)
        axios.delete(process.env.REACT_APP_DEPORTES + '/' + this.state.form._id, this.state.form)
            .then((response) => {
                this.modalEliminar() 
                this.peticionGet()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    seleccionarDeporte = (deporte) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                _id: deporte._id,
                dep_nombre: deporte.dep_nombre
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
    }

    render() {

        const form = this.state.form

        return (
            <div className="App">
                <div className="table_title"><h1>Deportes registrados</h1></div>
                <br />
                <table className="table ">
                    <div className="containertabla">
                    <thead>
                        <tr>
                            <th className="td">ID</th>
                            <th className="td">Nombre</th>
                            <th className="td">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((deporte) => {
                            return (
                                <tr>
                                    <td className="td">{deporte._id}</td>
                                    <td className="td">{deporte.dep_nombre}</td>
                                    <td>
                                        <button className="btn btn-primary">
                                            <FontAwesomeIcon icon={faEdit} onClick={() => { this.seleccionarDeporte(deporte); this.modalInsertar() }} />
                                        </button>
                                        {"  "}
                                        <button className="btn btn-danger">
                                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => { this.seleccionarDeporte(deporte); this.modalEliminar() }} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </div>
                </table>
                <div className="button-item">
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Deporte</button>
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
                            <label htmlFor="dep_nombre">Nombres</label>
                            <input
                                className="form-control"
                                type="text"
                                name="dep_nombre"
                                id="dep_nombre"
                                onChange={this.handleChange}
                                value={form ? form.dep_nombre: ''}
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

    export default PageDeportes;
