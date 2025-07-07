import CardColaboradores from "../cardcolaboradores/CardColaboradores";
import { useState, useEffect } from "react";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import type Colaborador from "../../../models/Colaborador";

function ListaColaboradores() {
    const navigate = useNavigate(); 
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [colaboradores, setColaboradores] = useState<Colaborador[]>([])

    async function buscarColaboradores() {
        setIsLoading(true)
        await buscar('/colaboradores', setColaboradores)
        setIsLoading(false)
    }
    
    useEffect(() => {
        buscarColaboradores()    
    }, [colaboradores.length])
       
    
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
                        className="mb-4 w-48 self-end bg-[#015B46] text-white py-2 px-4 rounded hover:bg-[#003C2D]"
                        onClick={() => navigate("/cadastrarcolaborador")}
                    >
                        Cadastrar novo colaborador 
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {colaboradores.map((colaborador) => (
                            <CardColaboradores key={colaborador.id} colaborador={colaborador} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaColaboradores;