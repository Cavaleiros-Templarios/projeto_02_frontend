import { SignOut, UserIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div className="w-full py-4 bg-white/95  shadow-md">
            <div className="container flex flex-wrap items-center justify-between mx-auto px-4">
                <Link to="/home" className="flex items-center">
                    <img
                        src="https://i.imgur.com/s2qrAOe.png"
                        alt="Logo"
                        className="h-24 w-auto"
                    />
                </Link>
                <div className="flex items-center gap-4 md:gap-6 text-green-900">
                    <Link to="/departamentos" className="hover:text-green-900 transition-colors duration-300">
                        Departamentos
                    </Link>
                    <Link to="/colaboradores" className="hover:text-green-900 transition-colors duration-300">
                        Colaboradores
                    </Link>
                    <Link to="/estatisticas" className="hover:text-green-900 transition-colors duration-300">
                        Estatísticas
                    </Link>
                    <Link to="/sobre" className="hover:text-green-900 transition-colors duration-300">
                        Sobre
                    </Link>
                    <Link to="/perfil" className="hover:text-green-900 transition-colors duration-300">
                        <UserIcon size={24} />
                    </Link>
                    <Link to="/home " className="hover:text-green-900 transition-colors duration-300">
                        <SignOut size={24} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar