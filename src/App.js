import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap/js/dist/dropdown'
//import Menu from "./components/Menu";
import PageDeportes from './components/PageDeportes';
import PageEquipos from './components/PageEquipos';
import PageEventos from './components/PageEventos';
import PageInicio from './components/PageInicio';
import PageUsuarios from './components/PageUsuarios';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import PageLogin from './components/PageLogin';
import MenuInicial from './components/MenuInicial';
import PageRegistro from './components/PageRegistro';

class App extends Component {
  render() {
    return (
      <>
      <Router>
        <MenuInicial/>
        <Routes>
          <Route path="/" element={<PageInicio />}/>
          <Route path="/PageInicio" element={<PageInicio />}/>
          <Route path="/PageLogin" element={<PageLogin />}/>
          <Route path="/PageDeportes" element={<PageDeportes />}/>
          <Route path="/PageEquipos" element={<PageEquipos />}/>
          <Route path="/PageEventos" element={<PageEventos />}/>
          <Route path="/PageUsuarios" element={<PageUsuarios />}/>
          <Route path="/PageRegistro" element={<PageRegistro />}/>
        </Routes>
      </Router>
      </>
    );
  }
}

export default App;