import type Departamento from "../../../models/Departamento";
import CardDepartamentos from "../carddepartamentos/CardDepartamentos";
import { useState, useEffect } from "react";
import { buscar, deletar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function ListaDepartamentos() {
    const navigate = useNavigate(); 
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [departamentos, setDepartamentos] = useState<Departamento[]>([])

    async function buscarDepartamentos() {
        setIsLoading(true)
        await buscar('/departamento', setDepartamentos)
        setIsLoading(false)
    }

    async function deletarDepartamento(id: number | undefined) {
        if (id === undefined) return
        
        if (window.confirm('Tem certeza que deseja deletar este departamento?')) {
            try {
                await deletar(`/departamento/${id}`)
                alert('Departamento deletado com sucesso!')
                buscarDepartamentos() // Recarrega a lista
            } catch (error: any) {
                alert('Erro ao deletar o departamento!')
                console.error(error)
            }
        }
    }
    
    useEffect(() => {
        buscarDepartamentos()    
    }, [departamentos.length])
       
    
    return (
        <>
        {isLoading && (
                <DNA
                visible={true}
                height="200"
                width="200"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    
                    <button
                        className="mb-4 w-48 self-end bg-slate-700 text-white py-2 px-4 rounded hover:bg-slate-800"
                        onClick={() => navigate("/cadastrardepartamento")}
                    >
                        Cadastrar novo departamento 
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {departamentos.map((departamento) => (
                            <CardDepartamentos 
                                key={departamento.id} 
                                departamento={departamento}
                                onDelete={deletarDepartamento}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaDepartamentos;