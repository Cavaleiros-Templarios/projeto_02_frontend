import { useEffect, useState } from 'react'

import { DNA } from 'react-loader-spinner'
import type Departamento from '../../../models/Departamento'
import CardDepartamentos from '../carddepartamentos/CardDepartamentos'
import { useNavigate } from 'react-router-dom'
import { listar } from '../../../services/Service'

function ListaDepartamentos() {

    const navigate = useNavigate(); 

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [departamentos, setDepartamentos] = useState<Departamento[]>([])

    async function buscarDepartamentos(){
        try {
            
            setIsLoading(true)

            await listar("/departamentos", setDepartamentos, {
            })

        } catch (error: any) {
            if(error.toString().includes("401")){
            }
        } finally {
            setIsLoading(false)
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
                        className="mb-4 w-48 self-end bg-[#015B46] text-white py-2 px-4 rounded hover:bg-[#003C2D]"
                        onClick={() => navigate("/cadastrardepartamento")}
                    >
                        Cadastrar novo departamento 
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {departamentos.map((departamento) => (
                            <CardDepartamentos key={departamento.id} departamento={departamento} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaDepartamentos