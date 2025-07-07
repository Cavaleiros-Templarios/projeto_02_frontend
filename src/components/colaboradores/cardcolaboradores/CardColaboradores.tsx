import { Link } from 'react-router-dom'
import type Colaborador from '../../../models/Colaborador'
import ModalCalculoSalario from '../../calculosalario/modalcalculosalario/ModalCalculoSalario'

interface CardColaboradoresProps {
  colaborador: Colaborador
}

function CardColaboradores({ colaborador }: CardColaboradoresProps) {
  return (
    <div className="max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-xl border border-[#015B46] transform transition duration-300 hover:scale-[1.02]">
      
      {/* Cabeçalho */}
      <div className="bg-[#015B46] text-white px-6 py-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">👤 Colaborador</h2>
        <ModalCalculoSalario id={colaborador.id!.toString()} />
      </div>

      {/* Conteúdo */}
      <div className="px-6 py-5 flex flex-col gap-3 text-gray-800 text-base bg-gray-50">
        <p><strong>🧾 Nome:</strong> {colaborador.nomeColaborador}</p>
        <p><strong>💼 Cargo:</strong> {colaborador.cargo}</p>
        <p><strong>💰 Salário:</strong> R$ {colaborador.salario}</p>
        <p><strong>🎂 Nascimento:</strong> {colaborador.dataNascimento}</p>
        <p><strong>🏢 Departamento:</strong> {colaborador.departamento?.nome}</p>
      </div>

      {/* Rodapé com ações */}
      <div className="grid grid-cols-2">
        <Link
          to={`/editarcolaborador/${colaborador.id}`}
          className="bg-[#47AD6D] hover:bg-[#015B46] text-white text-center py-3 font-semibold transition-colors duration-300 rounded-bl-3xl"
        >
           Editar
        </Link>

        <Link
          to={`/deletarcolaborador/${colaborador.id}`}
          className="bg-red-500 hover:bg-red-700 text-white text-center py-3 font-semibold transition-colors duration-300 rounded-br-3xl"
        >
           Deletar
        </Link>
      </div>
    </div>
  )
}

export default CardColaboradores