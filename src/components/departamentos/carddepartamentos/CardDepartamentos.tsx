// src/components/carddepartamentos/CardDepartamentos.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import type Departamento from "../../../models/Departamento";
import { RotatingLines } from "react-loader-spinner";

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
  className = "w-5 h-5", 
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
    edit: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
      </svg>
    ),
    trash: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"/>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
      </svg>
    ),
    chart: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
      </svg>
    ),
    star: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
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

// Componente de Barra de Progresso para Orçamento
const BudgetProgressBar: React.FC<{ 
  current: number; 
  max: number; 
  label: string;
}> = ({ current, max, label }) => {
  const percentage = Math.min((current / max) * 100, 100);
  const getColor = () => {
    if (percentage >= 90) return COLORS.danger;
    if (percentage >= 70) return COLORS.warning;
    return COLORS.success;
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-gray-600">{label}</span>
        <span className="text-xs font-bold" style={{ color: getColor() }}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: getColor()
          }}
        ></div>
      </div>
    </div>
  );
};

// Componente Badge de Status
const StatusBadge: React.FC<{ collaboratorCount: number }> = ({ collaboratorCount }) => {
  const getStatus = () => {
    if (collaboratorCount === 0) return { label: "Vazio", color: COLORS.danger };
    if (collaboratorCount <= 3) return { label: "Pequeno", color: COLORS.warning };
    if (collaboratorCount <= 10) return { label: "Médio", color: COLORS.info };
    return { label: "Grande", color: COLORS.success };
  };

  const status = getStatus();

  return (
    <div 
      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
      style={{ 
        backgroundColor: `${status.color}20`,
        color: status.color,
        border: `1px solid ${status.color}30`
      }}
    >
      <div 
        className="w-2 h-2 rounded-full mr-1"
        style={{ backgroundColor: status.color }}
      ></div>
      {status.label}
    </div>
  );
};

// Props do componente
interface CardDepartamentosProps {
  departamento: Departamento;
  onDelete: (id: number | undefined) => void;
}

// Componente principal
const CardDepartamentos: React.FC<CardDepartamentosProps> = ({ departamento, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Função para formatar orçamento
  const formatarOrcamento = (orcamento: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(orcamento);
  };

  // Função para deletar departamento
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(departamento.id);
    } catch (error) {
      console.error("Erro ao deletar departamento:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Obter inicial do nome para ícone
  const getInitials = (nome: string): string => {
    return nome
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const colaboradorCount = departamento.colaborador ? departamento.colaborador.length : 0;
  const maxBudget = 100000; // Orçamento máximo para cálculo de porcentagem

  return (
    <div 
      className="relative rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
      style={{ backgroundColor: COLORS.cardBackground }}
    >
      {/* Header do Card */}
      <div 
        className="p-6 pb-4"
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary}08, ${COLORS.accent1}08)`
        }}
      >
        <div className="flex items-start justify-between mb-4">
          {/* Ícone e Nome */}
          <div className="flex items-center space-x-3">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg relative overflow-hidden"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Icon type="building" className="w-7 h-7" />
              
              {/* Badge de eficiência */}
              <div 
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                style={{ backgroundColor: COLORS.success }}
              >
                <Icon type="star" className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {departamento.nome}
              </h3>
              <div className="flex items-center space-x-2">
                <StatusBadge collaboratorCount={colaboradorCount} />
              </div>
            </div>
          </div>

          {/* Indicador de Tendência */}
          <div 
            className="flex items-center space-x-1 px-2 py-1 rounded-lg"
            style={{ backgroundColor: `${COLORS.success}15` }}
          >
            <Icon type="trending" className="w-4 h-4" style={{ color: COLORS.success }} />
            <span className="text-xs font-medium" style={{ color: COLORS.success }}>
              Ativo
            </span>
          </div>
        </div>
      </div>

      {/* Corpo do Card */}
      <div className="px-6 pb-6">
        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Orçamento */}
          <div 
            className="p-4 rounded-xl"
            style={{ backgroundColor: `${COLORS.primary}10` }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Icon type="currency" style={{ color: COLORS.primary }} />
              <span className="text-sm font-medium text-gray-600">Orçamento</span>
            </div>
            <div className="text-lg font-bold" style={{ color: COLORS.primary }}>
              {formatarOrcamento(departamento.orcamento)}
            </div>
            <div className="mt-2">
              <BudgetProgressBar 
                current={departamento.orcamento} 
                max={maxBudget} 
                label="Utilização"
              />
            </div>
          </div>

          {/* Colaboradores */}
          <div 
            className="p-4 rounded-xl"
            style={{ backgroundColor: `${COLORS.accent3}10` }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Icon type="users" style={{ color: COLORS.accent2 }} />
              <span className="text-sm font-medium text-gray-600">Equipe</span>
            </div>
            <div className="text-lg font-bold" style={{ color: COLORS.accent2 }}>
              {colaboradorCount}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {colaboradorCount === 1 ? 'colaborador' : 'colaboradores'}
            </div>
          </div>
        </div>

        {/* Gráfico de Performance */}
        <div 
          className="p-4 rounded-xl mb-6"
          style={{ backgroundColor: `${COLORS.accent4}10` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon type="chart" style={{ color: COLORS.accent1 }} />
              <span className="text-sm font-medium text-gray-600">Performance</span>
            </div>
            <span className="text-xs font-bold" style={{ color: COLORS.accent1 }}>
              {colaboradorCount > 0 ? 'Produtivo' : 'Inativo'}
            </span>
          </div>
          
          {/* Mini gráfico de barras */}
          <div className="flex items-end space-x-1 h-8">
            {[...Array(7)].map((_, index) => {
              const height = Math.random() * 100;
              return (
                <div 
                  key={index}
                  className="flex-1 rounded-t transition-all duration-300"
                  style={{ 
                    height: `${height}%`,
                    backgroundColor: index < 5 ? COLORS.accent3 : COLORS.accent5,
                    minHeight: '4px'
                  }}
                ></div>
              );
            })}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex space-x-3">
          <Link
            to={`/editardepartamento/${departamento.id}`}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            style={{ backgroundColor: COLORS.primary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primaryHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primary;
            }}
          >
            <Icon type="edit" className="w-4 h-4" />
            <span>Editar</span>
          </Link>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: COLORS.danger }}
            onMouseEnter={(e) => {
              if (!isDeleting) {
                e.currentTarget.style.backgroundColor = "#DC2626";
              }
            }}
            onMouseLeave={(e) => {
              if (!isDeleting) {
                e.currentTarget.style.backgroundColor = COLORS.danger;
              }
            }}
          >
            {isDeleting ? (
              <RotatingLines strokeColor="white" strokeWidth="3" animationDuration="0.75" width="16" visible={true} />
            ) : (
              <>
                <Icon type="trash" className="w-4 h-4" />
                <span>Deletar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Efeito de hover no card */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary}05, ${COLORS.accent1}05)`,
          border: `1px solid ${COLORS.primary}20`
        }}
      ></div>
    </div>
  );
};

export default CardDepartamentos;

