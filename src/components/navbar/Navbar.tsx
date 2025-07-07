import { SignOut, User as UserIcon, List } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useState } from 'react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-full py-4 bg-white shadow-md">
            <div className="container flex flex-wrap items-center justify-between mx-auto px-4">
                <Link to="/home" className="flex items-center">
                    <img
                        src="https://i.imgur.com/s2qrAOe.png"
                        alt="Logo"
                        className="h-24 w-auto"
                    />
                </Link>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-900 focus:outline-none">
                        <List size={32} />
                    </button>
                </div>

                <div className="hidden md:flex items-center gap-4 md:gap-6 text-gray-900 font-medium">
                    <Link to="/departamentos" className="hover:text-green-900 transition-colors duration-300">
                        Departamentos
                    </Link>
                    <Link to="/colaboradores" className="hover:text-green-900 transition-colors duration-300">
                        Colaboradores
                    </Link>
                    <Link to="/projetos" className="hover:text-green-900 transition-colors duration-300">
                        Projeto
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
            
            {isMenuOpen && (
                <div className="md:hidden w-full mt-4 px-4 pb-4 border-t border-gray-200">
                    <div className="flex flex-col gap-4 text-gray-900 font-medium">
                        <Link to="/departamentos" className="block py-2 hover:text-green-900 transition-colors duration-300" onClick={toggleMenu}>
                            Departamentos
                        </Link>
                        <Link to="/colaboradores" className="block py-2 hover:text-green-900 transition-colors duration-300" onClick={toggleMenu}>
                            Colaboradores
                        </Link>
                        <Link to="/projetos" className="block py-2 hover:text-green-900 transition-colors duration-300" onClick={toggleMenu}>
                            Projeto
                        </Link>
                        <Link to="/sobre" className="block py-2 hover:text-green-900 transition-colors duration-300" onClick={toggleMenu}>
                            Sobre
                        </Link>
                        <Link to="/perfil" className="block py-2 hover:text-green-900 transition-colors duration-300" onClick={toggleMenu}>
                             Perfil
                        </Link>
                        <Link to="/home " className="block py-2 hover:text-green-900 transition-colors duration-300" onClick={toggleMenu}>
                             Sair
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;

