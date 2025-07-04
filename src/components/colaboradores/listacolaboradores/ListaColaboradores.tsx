import type Colaborador from "../../../models/Colaborador";
import CardColaboradores from "../cardcolaboradores/CardColaboradores";
import { useState, useEffect } from "react";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";

function ListaColaboradores() {

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