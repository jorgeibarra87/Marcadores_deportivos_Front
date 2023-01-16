import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"

class PageInicio extends Component {

    state = {       
        data: [],
    };

    peticionGet = () => {
        axios.get(process.env.REACT_APP_MARCADORES10).then((response) => {        
            this.setState({ data: response.data });
            console.log(this.state.data)
        })
            .catch(error => {
                console.log(error.message)
            })
    };

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

        return (
            <div className="App">
                <br />
                <div className="table_title"><h1>Eventos recientes</h1></div>
                <br />
                <table class="table table-responsive table-bordered">
                    <div className="containertabla">
                        <thead>
                            <tr>
                                <th className="td">Deporte</th>
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
                                        <td className="td">{evento.deporte}</td>
                                        <td className="td">{evento.equipo1}</td>
                                        <td className="td">{evento.mar_marcadoresqui1}</td>
                                        <td className="td">{evento.equipo2}</td>
                                        <td className="td">{evento.mar_marcadoresqui2}</td>
                                        <td>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </div>
                </table>
            </div>
        );
    }
}

export default PageInicio;