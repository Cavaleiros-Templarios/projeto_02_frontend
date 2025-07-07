import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'
import { atualizar, cadastrar, listar} from '../../../services/Service'
import type Departamento from '../../../models/Departamento'

function FormDepartamento() {

    const navigate = useNavigate()
 
    const [isLoading, setIsLoading] = useState<boolean>(false)
   
    const [departamento, setDepartamento] = useState<Departamento>({} as Departamento)

    const { id } = useParams<{ id: string }>()

    async function buscarDepartamentoPorid(id: string){
        try {
            await listar(`/departamentos/${id}`, setDepartamento, {

            })

        } catch (error: any) {
            if(error.toString().includes("401")){
                alert("Não listou os departamentos!")
            }
        } 
        }
    
    useEffect(()=>{
        if (id !== undefined){
            buscarDepartamentoPorid(id)
        }else{
            setDepartamento({
                id: undefined,
                nome: "",
                orcamento: 0,
            })
            }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setDepartamento({
            ...departamento,
            [e.target.name]: e.target.value,
        })
    }

    async function gerarNovaDepartamento(e: FormEvent<HTMLFormElement>){

        e.preventDefault()
        setIsLoading(true)
        
        if (id !== undefined){
            try{
                await atualizar("/departamentos", departamento, setDepartamento, {
                })
 
                alert("O departamento foi atualizado com sucesso!")
            }catch(error: any){
                alert("Erro ao atualizar o departamento!")
                console.error(error)
            }
        }else{
            try{
                await cadastrar("/departamentos", departamento, setDepartamento, {
                })
 
                alert("A categoria foi cadastrada com sucesso!")
            }catch(error: any){
                alert("Erro ao cadastrar categoria!")
                console.error(error)
            }
        }
     
        setIsLoading(false)
        retornar()
    }
    
    function retornar(){
        navigate("/departamentos")
    }    

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? "Cadastrar departamento" : "Editar departamento"}
            </h1>
 
            <form
                className="w-1/2 flex flex-col gap-4"
                onSubmit={gerarNovaDepartamento}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Nome Departamento</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui sua departamento"
                        name='nome'
                        className="border-2 border-slate-700 rounded p-2"
                        value={departamento.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="orcamento">Orçamento Departamento</label>
                    <input
                        type="number"
                        placeholder="Descreva aqui sua departamento"
                        name='orcamento'
                        className="border-2 border-slate-700 rounded p-2"
                        value={departamento.orcamento}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                   
                    {
                        isLoading ?
 
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                        :
                        <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                       
                    }
                   
                </button>
            </form>
        </div>
    );
}

export default FormDepartamento;