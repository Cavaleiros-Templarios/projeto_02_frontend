// src/components/colaboradores/ListaColaboradores.tsx

import React, { useState, useEffect } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import type Colaborador from "../../../../models/Colaborador";
import { buscar } from "../../../../services/Service";
import CardColaboradores from "../../cardcolaboradores/CardColaboradores";

// Paleta de cores verde consistente com o dashboard
const COLORS = {
  primary: "#015B46",        // Verde principal
  primaryHover: "#003C2D",   // Verde escuro para hover
  background: "#f3f4f6",     // Fundo claro
  cardBackground: "#f9fafb", // Branco menos vibrante para cards
  accent1: "#047857",        // Verde médio escuro
  accent2: "#059669",        // Verde médio
  accent3: "#10B981",        // Verde claro
  accent4: "#34D399",        // Verde muito claro
  accent5: "#6EE7B7",        // Verde pastel
  success: "#22C55E",        // Verde sucesso
  warning: "#F59E0B",        // Laranja para avisos
  danger: "#EF4444"          // Vermelho para deletar
};

// Componente de Ícone SVG
const Icon: React.FC<{ type: string; className?: string; style?: React.CSSProperties }> = ({ 
  type, 
  className = "w-5 h-5", 
  style 
}) => {
  const icons: Record<string, JSX.Element> = {
    plus: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
      </svg>
    ),
    users: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
      </svg>
    ),
    sparkles: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0V6H3a1 1 0 110-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 1a1 1 0 01.967.744L14.146 7.2 18.6 8.379a1 1 0 010 1.242L14.146 10.8l-1.179 5.456a1 1 0 01-1.934 0L9.854 10.8 5.4 9.621a1 1 0 010-1.242L9.854 7.2l1.179-5.456A1 1 0 0112 1z" clipRule="evenodd"/>
      </svg>
    ),
    refresh: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
      </svg>
    ),
    chart: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
      </svg>
    )
  };

  return icons[type] || <div className={className} style={style}>👤</div>;
};

// Componente principal
function ListaColaboradores() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

  async function buscarColaboradores() {
    setIsLoading(true);
    try {
      await buscar('/colaboradores', setColaboradores);
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarColaboradores();
  }, []);

  // Recarregar dados
  const handleRefresh = () => {
    buscarColaboradores();
  };

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="container mx-auto p-6">
        {/* Header Moderno */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-3">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${COLORS.primary}15` }}
                >
                  <Icon type="users" className="w-8 h-8" style={{ color: COLORS.primary }} />
                </div>
                <div>
                  <h1 
                    className="text-4xl font-bold"
                    style={{ 
                      background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.accent3})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Colaboradores
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon type="sparkles" className="w-4 h-4" style={{ color: COLORS.accent2 }} />
                    <p className="text-gray-600 text-lg">
                      Gerencie sua equipe de forma eficiente e moderna
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Estatística rápida */}
              <div 
                className="inline-flex items-center px-4 py-2 rounded-full shadow-sm"
                style={{ 
                  backgroundColor: `${COLORS.accent4}20`,
                  border: `1px solid ${COLORS.accent4}40`
                }}
              >
                <Icon type="chart" className="w-4 h-4 mr-2" style={{ color: COLORS.accent1 }} />
                <span className="text-sm font-medium" style={{ color: COLORS.accent1 }}>
                  {colaboradores.length} colaborador{colaboradores.length !== 1 ? 'es' : ''} cadastrado{colaboradores.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            {/* Botões de Ação */}
            <div className="flex space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: COLORS.cardBackground }}
              >
                <Icon type="refresh" className="w-5 h-5" />
                <span>Atualizar</span>
              </button>

              <button
                onClick={() => navigate("/cadastrarcolaborador")}
                disabled={isLoading}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: COLORS.primary,
                  boxShadow: `0 4px 14px 0 ${COLORS.primary}25`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.primary;
                }}
              >
                <Icon type="plus" className="w-5 h-5" />
                <span>Cadastrar Novo Colaborador</span>
              </button>
            </div>
          </div>

          {/* Linha decorativa */}
          <div 
            className="h-1 rounded-full"
            style={{
              background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.accent3}, ${COLORS.accent5})`
            }}
          ></div>
        </div>

        {/* Loading State Moderno */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div 
              className="text-center p-8 rounded-2xl shadow-lg"
              style={{ backgroundColor: COLORS.cardBackground }}
            >
              <div className="mb-6">
                <DNA 
                  visible={true} 
                  height={120} 
                  width={120} 
                  ariaLabel="loading"
                  wrapperStyle={{
                    filter: `hue-rotate(120deg) saturate(1.2)`
                  }}
                />
              </div>
              <div className="space-y-2">
                <h3 
                  className="text-xl font-semibold"
                  style={{ color: COLORS.primary }}
                >
                  Carregando colaboradores...
                </h3>
                <p className="text-gray-600">
                  Aguarde enquanto buscamos os dados mais recentes
                </p>
              </div>
              
              {/* Barra de progresso animada */}
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full animate-pulse"
                  style={{ 
                    backgroundColor: COLORS.accent3,
                    width: '70%',
                    animation: 'loading-bar 2s ease-in-out infinite'
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Grid de Colaboradores */}
        {!isLoading && (
          <>
            {colaboradores.length === 0 ? (
              <div 
                className="rounded-2xl p-12 text-center shadow-lg border border-gray-100"
                style={{ backgroundColor: COLORS.cardBackground }}
              >
                <div 
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS.accent4}20` }}
                >
                  <Icon type="users" className="w-10 h-10" style={{ color: COLORS.accent2 }} />
                </div>
                <h3 
                  className="text-2xl font-bold mb-3"
                  style={{ color: COLORS.primary }}
                >
                  Nenhum colaborador encontrado
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Ainda não há colaboradores cadastrados no sistema. 
                  Comece adicionando o primeiro membro da sua equipe!
                </p>
                <button
                  onClick={() => navigate("/cadastrarcolaborador")}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  <Icon type="plus" className="w-5 h-5" />
                  <span>Cadastrar Primeiro Colaborador</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cabeçalho da lista */}
                <div 
                  className="rounded-xl p-4 border border-gray-200"
                  style={{ backgroundColor: COLORS.cardBackground }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon type="users" style={{ color: COLORS.accent2 }} />
                      <span className="font-medium text-gray-700">
                        Exibindo {colaboradores.length} colaborador{colaboradores.length !== 1 ? 'es' : ''}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{ backgroundColor: COLORS.success }}
                      ></div>
                      <span className="text-sm text-gray-500">Dados atualizados</span>
                    </div>
                  </div>
                </div>

                {/* Grid de Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {colaboradores.map((colaborador, index) => (
                    <div
                      key={colaborador.id}
                      className="transform transition-all duration-300 hover:scale-105"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <div 
                        className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                        style={{ backgroundColor: COLORS.cardBackground }}
                      >
                        <CardColaboradores colaborador={colaborador} />
                      </div>
                    </div>
                  ))}
                </div>


              </div>
            )}
          </>
        )}
      </div>

      {/* Estilos CSS para animações */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes loading-bar {
            0% {
              width: 0%;
            }
            50% {
              width: 70%;
            }
            100% {
              width: 100%;
            }
          }
          
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 5px ${COLORS.primary}40;
            }
            50% {
              box-shadow: 0 0 20px ${COLORS.primary}60, 0 0 30px ${COLORS.primary}40;
            }
          }
          
          .container > * {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .grid > * {
            transition: all 0.3s ease;
          }
          
          .grid > *:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          }
          
          /* Efeito de hover no botão principal */
          button:hover {
            animation: pulse-glow 2s infinite;
          }
          
          /* Animação de entrada para o header */
          h1 {
            animation: fadeInUp 1s ease-out forwards;
          }
          
          /* Efeito de shimmer para elementos de loading */
          .animate-shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }
          
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}
      </style>
    </div>
  );
}

export default ListaColaboradores;

