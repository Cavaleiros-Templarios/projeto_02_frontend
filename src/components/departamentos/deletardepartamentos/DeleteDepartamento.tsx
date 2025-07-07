import { useEffect, useState } from "react"

import { buscar, deletar } from "../../../services/Service"
import { useNavigate, useParams } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"
import { Check, X } from "@phosphor-icons/react"
import type Departamento from "../../../models/Departamento"


function DeleteDepartamento() {

    const navigate = useNavigate()
 
    const [isLoading, setIsLoading] = useState<boolean>(false)
   
    const [departamento, setDepartamento] = useState<Departamento>({} as Departamento)

    const { id } = useParams<{ id: string }>()

    async function buscarDepartamentoPorid(id: string){
            try {
                await buscar(`/departamentos/${id}`, setDepartamento, )

            } catch (error: any) {
                if(error.toString().includes("401")){
                    alert("Não listou as departamentos!")
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

    async function deletarDepartamento() {
        setIsLoading(true)

        try {
            await deletar(`/departamentos/${id}`, )

            alert("Departamento foi excluída com sucesso!")

        } catch (error: any) {
            {
                alert("Erro ao Excluir a departamento!")
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
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Departamento</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar a departamento a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-indigo-900 text-white font-bold text-2xl'>
                    Departamento
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{departamento.nome}</p>
                <div className="flex">
                    <button 
                        className='w-full text-slate-100 bg-red-400 hover:bg-red-600 flex items-center justify-center'
                        onClick={retornar}
                        >
                        <X size={28} weight="bold" />
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center'
                        onClick={deletarDepartamento}           
                        >
                        {isLoading ? 
                                <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="24"
                                    visible={true}
                                /> 
                                : 
                                <Check size={28} weight="bold" />
                        }                
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDepartamento