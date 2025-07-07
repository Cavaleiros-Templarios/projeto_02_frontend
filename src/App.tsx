import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import './App.css'
import Home from './pages/home/Home'
import FormColaborador from './components/colaboradores/formcolaborador/FormColaborador'
import DeletarColaborador from './components/colaboradores/deletarcolaborador/DeletarColaborador'
import Sobre from './pages/sobre/Sobre'
import ListaDepartamentos from './components/departamentos/listadepartamentos/ListaDepartamentos'
import FormDepartamento from './components/departamentos/formdepartamentos/FormDepartamentos'
import Estatisticas from './pages/estatitiscas/Estatisticas'
import ListaColaboradores from './components/colaboradores/formcolaborador/listacolaboradores/ListaColaboradores'
// import FormCalculoSalario from './components/calculosalario/formcalculosalario/FormCalculoSalario'

function App() {
  return (
    <>
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/colaboradores" element={<ListaColaboradores />} />
              <Route path="/editarcolaborador/:id" element={<FormColaborador />} />
              <Route path="/cadastrarcolaborador" element={<FormColaborador />} />
              <Route path="/deletarcolaborador/:id" element={<DeletarColaborador />} />
              <Route path="/departamentos" element={<ListaDepartamentos />} />
              <Route path="/editardepartamento/:id" element={<FormDepartamento />} />
              <Route path="/cadastrardepartamento" element={<FormDepartamento />} />
              <Route path="/sobre" element={<Sobre />} />
              {/* <Route path="/salario/:id" element={<FormCalculoSalario />} /> */}
              {/* <Route path="/departamentos" element={<ListarDepartamentos />} /> 
              <Route path="/projetos" element={<ListarProjetos />} /> */}
              <Route path="/estatisticas" element={<Estatisticas />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  )
}

export default App