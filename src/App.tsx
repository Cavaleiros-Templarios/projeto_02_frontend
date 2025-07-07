import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import './App.css'
import Home from './pages/home/Home'
import ListaColaboradores from './components/colaboradores/listacolaboradores/ListaColaboradores'
import FormColaborador from './components/colaboradores/formcolaborador/FormColaborador'
import DeletarColaborador from './components/colaboradores/deletarcolaborador/DeletarColaborador'
import Sobre from './pages/sobre/Sobre'
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
              <Route path="/sobre" element={<Sobre />} />
              {/* <Route path="/salario/:id" element={<FormCalculoSalario />} /> */}
              {/* <Route path="/departamentos" element={<ListarDepartamentos />} /> 
              <Route path="/projetos" element={<ListarProjetos />} /> */}
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  )
}

export default App