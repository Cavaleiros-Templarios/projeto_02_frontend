import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  github?: string;
  linkedin?: string;
  avatar?: string;
}

const Sobre: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Pedro Coelho",
      role: "Developer",
      github: "https://github.com/phccoelho",
      linkedin: "https://linkedin.com/in/pedro-coelho-646552273",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/forte.jpg?updatedAt=1751557438146"
    },
    {
      name: "Fabricio Vicente Soares",
      role: "Developer",
      github: "https://github.com/Fabriciovics",
      linkedin: "https://linkedin.com/in/fabriciovics",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/fabricio.jpg?updatedAt=1751557438115"
    },
    {
      name: "Cristiano Forner",
      role: "Developer",
      github: "https://github.com/cristianoforner",
      linkedin: "https://linkedin.com/in/cristianoforner",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/truco.jpg?updatedAt=1751557438147"
    },
    {
      name: "Gustavo Brassaroto Lira",
      role: "Developer",
      github: "https://github.com/Brassaroto",
      linkedin: "https://linkedin.com/in/gustavo-brassaroto-lira-a9a378221",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/ex.jpg?updatedAt=1751557438293"
    },
    {
      name: "Alex Ikezili",
      role: "Developer",
      github: "https://github.com/alexikezili",
      linkedin: "https://linkedin.com/in/alexikezili",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/alex.jpg?updatedAt=1751557438211"
    },
    {
      name: "Wesley Lima",
      role: "Developer",
      github: "https://github.com/Wezzlim",
      linkedin: "https://www.linkedin.com/in/wesleytecnologia/",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/wesley.jpg?updatedAt=1751557438143"
    },
    {
      name: "Thiago Tasseli",
      role: "Developer",
      github: "https://github.com/tasselii",
      linkedin: "https://linkedin.com/in/thiagotasseli-tech",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/eu.jpg?updatedAt=1751557438326"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Imagem Parte de Cima do Texto */}
      <div className="flex justify-center">
        <img
          src="https://i.imgur.com/SOKlBb2.png"
          alt="Ilustração"
          className="w-1/5 mt-[5rem]"
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Sobre o CoreHumans */}
        <section className="mb-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-[var(--cor-primaria)] mb-5">Sobre o Core Humans</h1>
            <div className="rounded-lg shadow-lg px-10 py-10 mb-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                O CoreHumans é um software gerenciador de Recursos Humanos.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Funciona de forma rápida e clara, com estrutura pronta para crescer.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nosso projeto nasceu da necessidade de otimizar e modernizar os processos de RH, colocando as pessoas no centro da gestão.
              </p>
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--cor-primaria)] text-center mb-12">Equipe de Desenvolvimento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Primeiros 4 cards */}
              {teamMembers.slice(0, 4).map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300
                            transform hover:scale-110"
                >
                  <div className="w-30 h-30 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center bg-gray-100">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                        </svg>
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.299 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Últimos 3 cards centralizados */}
            <div className="flex flex-wrap justify-center gap-8 mt-8"> {/* Adicionado mt-8 para espaçamento */}
              {teamMembers.slice(4).map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4
                  transform hover:scale-110" // Ajuste de largura para centralizar e manter responsividade
                >
                  <div className="w-30 h-30 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center bg-gray-100">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                        </svg>
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.299 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tecnologias Utilizadas */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--cor-primaria)] text-center mb-12">Tecnologias Utilizadas</h2>

            {/* Primeiros 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {[
                { label: "React", color: "orange", icon: "R", desc: "Biblioteca JavaScript para interfaces" },
                { label: "TypeScript", color: "blue", icon: "TS", desc: "JavaScript com tipagem estática" },
                { label: "Tailwind CSS", color: "cyan", icon: "TW", desc: "Framework CSS utilitário" },
              ].map(({ label, color, icon, desc }, i) => (
                <div key={i} className="text-center">
                  <div className={`bg-${color}-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <span className={`text-2xl font-bold text-${color}-600`}>{icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{label}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>

            {/* Últimos 3 centralizados */}
            <div className="flex flex-col md:flex-row justify-center gap-6">
              {[
                { label: "Node.js", color: "green", icon: "N", desc: "Runtime JavaScript no servidor" },
                { label: "Database", color: "purple", icon: "DB", desc: "Sistema de gerenciamento de dados" },
                { label: "REST API", color: "red", icon: "API", desc: "Interface de programação" },
              ].map(({ label, color, icon, desc }, i) => (
                <div key={i} className="text-center w-full md:w-1/3">
                  <div className={`bg-${color}-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <span className={`text-2xl font-bold text-${color}-600`}>{icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{label}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sobre;