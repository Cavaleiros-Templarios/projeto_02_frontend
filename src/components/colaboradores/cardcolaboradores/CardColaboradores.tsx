import { Link } from 'react-router-dom'
import type Colaborador from '../../../models/Colaborador'
import ModalCalculoSalario from '../../calculosalario/modalcalculosalario/ModalCalculoSalario'

interface CardColaboradoresProps{
    colaborador: Colaborador
}

function CardColaboradores({colaborador}: CardColaboradoresProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='flex items-center justify-between py-2 px-6 bg-slate-800 text-white font-bold text-2xl'>
                <span>Colaborador</span>
                <div>
                    <ModalCalculoSalario id={colaborador.id!.toString()}/>
                </div>
            </header>
            <p className='py-2 px-6 text-3xl bg-slate-200 h-full'>Nome: {colaborador.nomeColaborador}</p>
            <p className='py-2 px-6 text-3xl bg-slate-200 h-full'>Cargo: {colaborador.cargo}</p>
            <p className='py-2 px-6 text-3xl bg-slate-200 h-full'>Salário base: {colaborador.salario}</p>
            <p className='py-2 px-6 text-3xl bg-slate-200 h-full'>Data de nascimento: {colaborador.dataNascimento}</p>
            <p className='py-2 px-6 text-3xl bg-slate-200 h-full'>Departamento: {colaborador.departamento?.nome}</p>
            
            <div className="flex">
                <Link to={`/editarcolaborador/${colaborador.id}`} 
                    className='w-full text-slate-100 bg-teal-600 hover:bg-teal-700
                        flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletarcolaborador/${colaborador.id}`} className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                    flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardColaboradores