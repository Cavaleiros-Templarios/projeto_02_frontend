import { useState, useEffect, type ChangeEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Colaborador from "../../../models/Colaborador"
import { buscar, cadastrar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import type CalculoSalario from "../../../models/CalculoSalario"

interface FormProps {
    id: string;
}

function FormCalculoSalario({ id }: FormProps) {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [colaborador, setColaborador] = useState<Colaborador>({} as Colaborador)
    const [calculosalario, setCalculoSalario] = useState<CalculoSalario>({} as CalculoSalario)

    async function buscarColaboradorPorId(id: string) {
        await buscar(`/colaboradores/${id}`, setColaborador)
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarColaboradorPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCalculoSalario({
            ...calculosalario,
            [e.target.name]: e.target.value
        })
    }

    async function calcularSalario(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        try{
            await cadastrar(`/colaboradores/salario/${id}`, calculosalario, setCalculoSalario)
        } catch (error: any) {
            alert("Erro ao calcular salário!")
            console.error(error)
        }
        setIsLoading(false)
        retornar()
    } 

    function retornar(){
        navigate("/colaboradores")
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                Salário
            </h1>

            <form className="w-1/2 flex flex-col gap-4" 
                onSubmit={calcularSalario}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="horasTrabalhadas">Horas trabalhadas</label>
                    <input
                        type="number"
                        placeholder="Horas trabalhadas"
                        name='horasTrabalhadas'
                        className="border-2 border-slate-700 rounded p-2"
                        value={calculosalario.horasTrabalhadas}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="bonus">Bônus</label>
                    <input
                        type="number"
                        placeholder="Bônus"
                        name='bonus'
                        className="border-2 border-slate-700 rounded p-2"
                        value={calculosalario.bonus}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descontos">Descontos</label>
                    <input
                        type="number"
                        placeholder="Descontos"
                        name='descontos'
                        className="border-2 border-slate-700 rounded p-2"
                        value={calculosalario.descontos}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-slate-700 cursor-pointer
                               hover:bg-slate-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    {
                        isLoading ? (
                            <RotatingLines strokeColor="white"strokeWidth="5"animationDuration="0.75"width="24"visible={true}/> 
                        ) : (
                            <span>Calcular salário</span>
                        )
                    }
                </button>
            </form>
        </div>
    );
}

export default FormCalculoSalario;