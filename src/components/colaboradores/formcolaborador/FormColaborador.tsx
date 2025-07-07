import { useState, useEffect, type ChangeEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Colaborador from "../../../models/Colaborador"
import { buscar, atualizar, cadastrar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import type Departamento from "../../../models/Departamento"

function FormColaborador() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [departamentos, setDepartamentos] = useState<Departamento[]>([])

    const [departamento, setDepartamento] = useState<Departamento>({ id: 0, nome: '', orcamento: 0, })
    const [colaborador, setColaborador] = useState<Colaborador>({} as Colaborador)
    
    const { id } = useParams<{ id: string }>()

    async function buscarColaboradorPorId(id: string) {
        await buscar(`/colaboradores/${id}`, setColaborador)
    }

    async function buscarDepartamentoPorId(id: string) {
        await buscar(`/departamento/${id}`, setDepartamento)
    }

    async function buscarDepartamentos() {
        await buscar('/departamento', setDepartamentos)
    }

    useEffect(() => {
        buscarDepartamentos()

        if (id !== undefined) {
            buscarColaboradorPorId(id)
        }
    }, [id])

    useEffect(() => {
        setColaborador({
            ...colaborador,
            departamento: departamento,
        })
    }, [departamento])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setColaborador({
            ...colaborador,
            [e.target.name]: e.target.value,
            departamento: departamento
        })
    }

    async function gerarNovaColaborador(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if(id !== undefined){
            try {
                await atualizar(`/colaboradores`, colaborador, setColaborador)
                alert("A Colaborador foi atualizado com sucesso!")
            } catch (error: any) {
                alert("Erro ao atualizar o Colaborador!")
                console.error(error)
            }
        } else {
            try {
                await cadastrar(`/colaboradores`, colaborador, setColaborador)
                alert("A Colaborador foi cadastrado com sucesso!")
            } catch (error: any) {
                alert("Erro ao cadastrar o Colaborador!")
                console.error(error)
                }
            }
        setIsLoading(false)
        retornar()
    }

    function retornar(){
        navigate("/colaboradores")
    }

    const carregandoDepartamento = departamento.nome === '';

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? "Cadastrar Colaborador" : "Editar Colaborador"}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" 
                onSubmit={gerarNovaColaborador}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nomeColaborador">Nome do colaborador</label>
                    <input
                        type="text"
                        placeholder="Colaborador"
                        name='nomeColaborador'
                        className="border-2 border-slate-700 rounded p-2"
                        value={colaborador.nomeColaborador}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="salario">Salario</label>
                    <input
                        type="number"
                        placeholder="Salario"
                        name='salario'
                        className="border-2 border-slate-700 rounded p-2"
                        value={colaborador.salario}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="cargo">Cargo</label>
                    <input
                        type="text"
                        placeholder="Cargo"
                        name='cargo'
                        className="border-2 border-slate-700 rounded p-2"
                        value={colaborador.cargo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="dataNascimento">Data de nascimento</label>
                    <input
                    type="date"
                    placeholder="Data de nascimento"
                    name="dataNascimento"
                    className="border-2 border-slate-700 rounded p-2"
                    value={colaborador.dataNascimento}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Departamento</p>
                    <select name="departamento" id="departamento" className='border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarDepartamentoPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione um Departamento</option>

                        {departamentos.map((departamento) => (
                            <option value={departamento.id} >{departamento.nome}</option>
                        ))}

                    </select>
                </div>
                <button
                    className="rounded text-slate-100 bg-slate-700 cursor-pointer
                               hover:bg-slate-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit"
                    disabled={carregandoDepartamento}>
                        
                    {
                        isLoading ? (
                            <RotatingLines strokeColor="white"strokeWidth="5"animationDuration="0.75"width="24"visible={true}/> 
                        ) : (
                            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                        )
                    }
                </button>
            </form>
        </div>
    );
}

export default FormColaborador;