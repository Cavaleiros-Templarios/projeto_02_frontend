import { Link } from 'react-router-dom'
import type Departamento from '../../../models/Departamento'

interface CardDepartamentosProps{
    departamento: Departamento
    onDelete: (id: number | undefined) => void
}

function CardDepartamentos({departamento, onDelete}: CardDepartamentosProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-slate-800 text-white font-bold text-2xl'>
                Departamento
            </header>
            <p className='py-2 px-6 text-3xl bg-slate-200 h-full'>Nome: {departamento.nome}</p>
            <p className='py-2 px-6 text-3xl bg-slate-200 h-full'>Orçamento: R$ {departamento.orcamento}</p>
            <p className='py-2 px-6 text-3xl bg-slate-200 h-full'>
                Colaboradores: {departamento.colaborador ? departamento.colaborador.length : 0}
            </p>
            
            <div className="flex">
                <Link to={`/editardepartamento/${departamento.id}`} 
                    className='w-full text-slate-100 bg-teal-600 hover:bg-teal-700
                        flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <button 
                    onClick={() => onDelete(departamento.id)}
                    className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                        flex items-center justify-center py-2'
                >
                    Deletar
                </button>
            </div>

        </div>
    )
}

export default CardDepartamentos