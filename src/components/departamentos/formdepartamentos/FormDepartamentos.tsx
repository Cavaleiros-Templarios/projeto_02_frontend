import { useState, useEffect, type ChangeEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Departamento from "../../../models/Departamento"
import { buscar, atualizar, cadastrar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"

function FormDepartamento() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [departamento, setDepartamento] = useState<Departamento>({
        id: undefined,
        nome: '',
        orcamento: 0
    })
    
    const { id } = useParams<{ id: string }>()

    async function buscarDepartamentoPorId(id: string) {
        await buscar(`/departamento/${id}`, setDepartamento)
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarDepartamentoPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setDepartamento({
            ...departamento,
            [e.target.name]: e.target.name === 'orcamento' ? Number(e.target.value) : e.target.value
        })
    }

    async function gerarNovoDepartamento(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        // Debug: vamos ver o que está sendo enviado
        console.log('Dados do departamento:', departamento)

        if(id !== undefined){
            try {
                await atualizar(`/departamento`, departamento, setDepartamento)
                alert("O Departamento foi atualizado com sucesso!")
                retornar()
            } catch (error: any) {
                console.error('Erro completo:', error)
                alert("Erro ao atualizar o Departamento!")
            }
        } else {
            try {
                // Remover o ID para cadastro
                const departamentoParaCadastro = {
                    nome: departamento.nome,
                    orcamento: departamento.orcamento
                }
                console.log('Enviando para cadastro:', departamentoParaCadastro)
                
                await cadastrar(`/departamentos`, departamentoParaCadastro, setDepartamento)
                alert("O Departamento foi cadastrado com sucesso!")
                retornar()
            } catch (error: any) {
                console.error('Erro completo:', error)
                alert("Erro ao cadastrar o Departamento!")
                }
            }
        setIsLoading(false)
    }

    function retornar(){
        navigate("/departamentos")
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? "Cadastrar Departamento" : "Editar Departamento"}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" 
                onSubmit={gerarNovoDepartamento}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Nome do departamento</label>
                    <input
                        type="text"
                        placeholder="Nome do departamento"
                        name='nome'
                        className="border-2 border-slate-700 rounded p-2"
                        value={departamento.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="orcamento">Orçamento</label>
                    <input
                        type="number"
                        placeholder="Orçamento"
                        name='orcamento'
                        className="border-2 border-slate-700 rounded p-2"
                        value={departamento.orcamento}
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
                            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                        )
                    }
                </button>
            </form>
        </div>
    );
}

export default FormDepartamento;