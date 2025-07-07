// src/components/departamentos/ListaDepartamentos.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type Departamento from "../../../models/Departamento";
import CardDepartamentos from "../carddepartamentos/CardDepartamentos";
import { buscar, deletar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";

// Paleta de cores verde consistente
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
  danger: "#EF4444",         // Vermelho para deletar
  info: "#3B82F6"            // Azul para informações
};

// Componente de Ícone SVG
const Icon: React.FC<{ type: string; className?: string; style?: React.CSSProperties }> = ({ 
  type, 
  className = "w-6 h-6", 
  style 
}) => {
  const icons: Record<string, JSX.Element> = {
    building: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
      </svg>
    ),
    currency: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
      </svg>
    ),
    users: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
      </svg>
    ),
    chart: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
      </svg>
    ),
    search: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
      </svg>
    ),
    plus: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
      </svg>
    ),
    filter: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"/>
      </svg>
    ),
    sparkles: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0V6H3a1 1 0 110-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 1a1 1 0 01.967.744L14.146 7.2 18.6 8.379a1 1 0 010 1.242L14.146 10.8l-1.179 5.456a1 1 0 01-1.934 0L9.854 10.8 5.4 9.621a1 1 0 010-1.242L9.854 7.2l1.179-5.456A1 1 0 0112 1z" clipRule="evenodd"/>
      </svg>
    ),
    trending: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/>
      </svg>
    )
  };

  return icons[type] || <div className={className} style={style}>🏢</div>;
};

// Componente de Notificação
const Notification: React.FC<{
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
}> = ({ type, message, onClose }) => {
  const getColor = () => {
    switch (type) {
      case 'success': return COLORS.success;
      case 'error': return COLORS.danger;
      case 'warning': return COLORS.warning;
      default: return COLORS.info;
    }
  };

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white font-medium animate-slide-in"
      style={{ backgroundColor: getColor() }}
    >
      {message}
    </div>
  );
};

// Componente principal
const ListaDepartamentos: React.FC = () => {
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [filteredDepartamentos, setFilteredDepartamentos] = useState<Departamento[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [budgetFilter, setBudgetFilter] = useState<string>("all");
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  // Função para buscar departamentos
  async function buscarDepartamentos() {
    setIsLoading(true);
    try {
      await buscar('/departamento', setDepartamentos);
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
      setNotification({
        type: 'error',
        message: 'Erro ao carregar departamentos. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Função para deletar departamento
  async function deletarDepartamento(id: number | undefined) {
    if (id === undefined) return;
    
    if (window.confirm('Tem certeza que deseja deletar este departamento?')) {
      try {
        await deletar(`/departamento/${id}`);
        setNotification({
          type: 'success',
          message: 'Departamento deletado com sucesso!'
        });
        buscarDepartamentos(); // Recarrega a lista
      } catch (error: any) {
        console.error(error);
        setNotification({
          type: 'error',
          message: 'Erro ao deletar o departamento!'
        });
      }
    }
  }

  // Efeito para carregar departamentos
  useEffect(() => {
    buscarDepartamentos();
  }, []);

  // Efeito para filtrar departamentos
  useEffect(() => {
    let filtered = departamentos.filter(dept =>
      dept.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (budgetFilter !== "all") {
      filtered = filtered.filter(dept => {
        switch (budgetFilter) {
          case "low": return dept.orcamento < 50000;
          case "medium": return dept.orcamento >= 50000 && dept.orcamento < 100000;
          case "high": return dept.orcamento >= 100000;
          default: return true;
        }
      });
    }

    setFilteredDepartamentos(filtered);
  }, [departamentos, searchTerm, budgetFilter]);

  // Calcular estatísticas
  const totalDepartamentos = departamentos.length;
  const totalOrcamento = departamentos.reduce((sum, dept) => sum + dept.orcamento, 0);
  const totalColaboradores = departamentos.reduce((sum, dept) => 
    sum + (dept.colaborador ? dept.colaborador.length : 0), 0
  );
  const orcamentoMedio = totalDepartamentos > 0 ? totalOrcamento / totalDepartamentos : 0;

  // Formatação de moeda
  const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Notificação */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Principal */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Icon type="building" className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 
                className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent2})`
                }}
              >
                Gestão de Departamentos
              </h1>
              <p className="text-gray-600 text-lg">
                Organize e monitore a estrutura organizacional
              </p>
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total de Departamentos */}
          <div 
            className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ backgroundColor: COLORS.cardBackground }}
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.primary}15` }}
              >
                <Icon type="building" style={{ color: COLORS.primary }} />
              </div>
              <div 
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${COLORS.success}20`,
                  color: COLORS.success
                }}
              >
                Total
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {totalDepartamentos}
            </div>
            <div className="text-sm text-gray-600">
              Departamentos ativos
            </div>
          </div>

          {/* Orçamento Total */}
          <div 
            className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ backgroundColor: COLORS.cardBackground }}
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.accent2}15` }}
              >
                <Icon type="currency" style={{ color: COLORS.accent2 }} />
              </div>
              <div 
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${COLORS.accent2}20`,
                  color: COLORS.accent2
                }}
              >
                Orçamento
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {formatarMoeda(totalOrcamento)}
            </div>
            <div className="text-sm text-gray-600">
              Investimento total
            </div>
          </div>

          {/* Total de Colaboradores */}
          <div 
            className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ backgroundColor: COLORS.cardBackground }}
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.accent3}15` }}
              >
                <Icon type="users" style={{ color: COLORS.accent3 }} />
              </div>
              <div 
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${COLORS.accent3}20`,
                  color: COLORS.accent3
                }}
              >
                Equipe
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {totalColaboradores}
            </div>
            <div className="text-sm text-gray-600">
              Colaboradores totais
            </div>
          </div>

          {/* Orçamento Médio */}
          <div 
            className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ backgroundColor: COLORS.cardBackground }}
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.accent1}15` }}
              >
                <Icon type="chart" style={{ color: COLORS.accent1 }} />
              </div>
              <div 
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${COLORS.accent1}20`,
                  color: COLORS.accent1
                }}
              >
                Média
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {formatarMoeda(orcamentoMedio)}
            </div>
            <div className="text-sm text-gray-600">
              Por departamento
            </div>
          </div>
        </div>

        {/* Controles de Filtro e Busca */}
        <div 
          className="p-6 rounded-2xl shadow-lg mb-8"
          style={{ backgroundColor: COLORS.cardBackground }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Busca */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon type="search" className="w-5 h-5" style={{ color: COLORS.accent2 }} />
              </div>
              <input
                type="text"
                placeholder="Buscar departamentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-200"
                style={{ 
                  borderColor: searchTerm ? COLORS.accent3 : undefined
                }}
              />
            </div>

            {/* Filtro por Orçamento */}
            <div className="flex items-center space-x-3">
              <Icon type="filter" style={{ color: COLORS.accent1 }} />
              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-200"
              >
                <option value="all">Todos os orçamentos</option>
                <option value="low">Até R$ 50.000</option>
                <option value="medium">R$ 50.000 - R$ 100.000</option>
                <option value="high">Acima de R$ 100.000</option>
              </select>
            </div>

            {/* Botão Cadastrar */}
            <button
              onClick={() => navigate("/cadastrardepartamento")}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              style={{ backgroundColor: COLORS.primary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.primaryHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.primary;
              }}
            >
              <Icon type="plus" className="w-5 h-5" />
              <span>Novo Departamento</span>
            </button>
          </div>

          {/* Indicadores de Filtro */}
          <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Icon type="sparkles" className="w-4 h-4" style={{ color: COLORS.accent3 }} />
              <span className="text-sm text-gray-600">
                Exibindo <span className="font-semibold" style={{ color: COLORS.accent1 }}>
                  {filteredDepartamentos.length}
                </span> de {totalDepartamentos} departamentos
              </span>
            </div>
            
            {searchTerm && (
              <div 
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${COLORS.accent3}20`,
                  color: COLORS.accent1
                }}
              >
                Busca: "{searchTerm}"
              </div>
            )}
            
            {budgetFilter !== "all" && (
              <div 
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${COLORS.accent2}20`,
                  color: COLORS.accent1
                }}
              >
                Filtro: {budgetFilter === "low" ? "Baixo" : budgetFilter === "medium" ? "Médio" : "Alto"}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <DNA
                visible={true}
                height="120"
                width="120"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper mx-auto mb-4"
              />
              <div 
                className="text-lg font-medium animate-pulse"
                style={{ color: COLORS.primary }}
              >
                Carregando departamentos...
              </div>
              <div className="w-32 h-1 mx-auto mt-2 rounded-full overflow-hidden" style={{ backgroundColor: `${COLORS.primary}20` }}>
                <div 
                  className="h-full rounded-full animate-pulse"
                  style={{ 
                    backgroundColor: COLORS.primary,
                    animation: 'loading-bar 2s ease-in-out infinite'
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Departamentos */}
        {!isLoading && (
          <>
            {filteredDepartamentos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDepartamentos.map((departamento, index) => (
                  <div
                    key={departamento.id}
                    className="animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <CardDepartamentos 
                      departamento={departamento}
                      onDelete={deletarDepartamento}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div 
                  className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${COLORS.accent4}20` }}
                >
                  <Icon type="building" className="w-12 h-12" style={{ color: COLORS.accent2 }} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {searchTerm || budgetFilter !== "all" 
                    ? "Nenhum departamento encontrado" 
                    : "Nenhum departamento cadastrado"
                  }
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || budgetFilter !== "all"
                    ? "Tente ajustar os filtros de busca para encontrar departamentos."
                    : "Comece criando seu primeiro departamento para organizar a estrutura da empresa."
                  }
                </p>
                <button
                  onClick={() => navigate("/cadastrardepartamento")}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  <Icon type="plus" className="w-5 h-5" />
                  <span>Criar Primeiro Departamento</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Estilos CSS inline para animações */}
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
          
          @keyframes slide-in {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes loading-bar {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out;
          }
          
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default ListaDepartamentos;

