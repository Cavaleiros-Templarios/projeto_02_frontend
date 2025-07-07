import { useState, useEffect } from 'react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: "👥",
      title: "Gestão de Colaboradores",
      description: "Controle completo do ciclo de vida dos funcionários, desde admissão até desligamento."
    },
    {
      icon: "📊",
      title: "Analytics Avançado",
      description: "Relatórios detalhados e insights para tomada de decisões estratégicas em RH."
    },
    {
      icon: "🔒",
      title: "Segurança de Dados",
      description: "Proteção total das informações pessoais e confidenciais dos colaboradores."
    },
    {
      icon: "⏰",
      title: "Controle de Ponto",
      description: "Sistema integrado de controle de jornada e gestão de horários de trabalho."
    },
    {
      icon: "🏆",
      title: "Avaliação de Performance",
      description: "Ferramentas para avaliação 360° e acompanhamento do desenvolvimento profissional."
    },
    {
      icon: "📈",
      title: "Dashboard Executivo",
      description: "Visão estratégica com KPIs e métricas essenciais para a gestão de pessoas."
    }
  ];

  const stats = [
    { number: "500+", label: "Empresas Atendidas" },
    { number: "50k+", label: "Colaboradores Gerenciados" },
    { number: "99.9%", label: "Uptime Garantido" },
    { number: "24/7", label: "Suporte Técnico" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Gestão de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Pessoas</span>
              <br />
              Inteligente e Eficaz
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transforme a gestão de recursos humanos da sua empresa com nossa plataforma completa. 
              Automatize processos, otimize decisões e potencialize o desenvolvimento dos seus talentos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105">
                Começar Agora
              </button>
              <button className="border border-gray-400 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105">
                Sobre
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Recursos Poderosos para
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600"> Sua Empresa</span>
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubra como nossa plataforma pode revolucionar a gestão de pessoas na sua organização
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-emerald-900/50 to-blue-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para Transformar seu RH?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Junte-se a centenas de empresas que já revolucionaram sua gestão de pessoas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105">
              Solicitar Demonstração
            </button>
            <button className="border border-gray-400 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105">
              Falar com Especialista
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

