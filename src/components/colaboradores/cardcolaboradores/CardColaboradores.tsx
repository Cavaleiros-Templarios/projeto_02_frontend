// src/components/cardcolaboradores/CardColaboradores.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type Colaborador from "../../../models/Colaborador";
import { deletar } from "../../../services/Service";
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
  danger: "#EF4444"          // Vermelho para deletar
};

// Componente de Ícone SVG
const Icon: React.FC<{ type: string; className?: string; style?: React.CSSProperties }> = ({ 
  type, 
  className = "w-5 h-5", 
  style 
}) => {
  const icons: Record<string, JSX.Element> = {
    user: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
      </svg>
    ),
    briefcase: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-1a1 1 0 00-1 1v1h2V6a1 1 0 00-1-1z" clipRule="evenodd"/>
      </svg>
    ),
    currency: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
      </svg>
    ),
    calendar: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
      </svg>
    ),
    building: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
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
    calculator: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm2 0a1 1 0 100 2h.01a1 1 0 100-2H11zm0-2a1 1 0 100 2h.01a1 1 0 100-2H11zm-2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm-2 0a1 1 0 100 2h.01a1 1 0 100-2H7z" clipRule="evenodd"/>
      </svg>
    )
  };

  return icons[type] || <div className={className} style={style}>👤</div>;
};

// Componente Badge para Departamento
const DepartmentBadge: React.FC<{ departmentName: string }> = ({ departmentName }) => {
  const getBadgeColor = (name: string) => {
    const colors = [COLORS.accent3, COLORS.accent2, COLORS.accent1, COLORS.primary];
    const index = name.length % colors.length;
    return colors[index];
  };

  const badgeColor = getBadgeColor(departmentName);

  return (
    <div 
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
      style={{ 
        backgroundColor: `${badgeColor}20`,
        color: badgeColor,
        border: `1px solid ${badgeColor}30`
      }}
    >
      <Icon type="building" className="w-3 h-3 mr-1" style={{ color: badgeColor }} />
      {departmentName}
    </div>
  );
};

// Props do componente
interface CardColaboradoresProps {
  colaborador: Colaborador;
}

// Componente principal
const CardColaboradores: React.FC<CardColaboradoresProps> = ({ colaborador }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Função para calcular idade
  const calcularIdade = (dataNascimento: string): number => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  };

  // Função para formatar salário
  const formatarSalario = (salario: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(salario);
  };

  // Função para formatar data
  const formatarData = (data: string): string => {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  };

  // Função para deletar colaborador
  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja deletar o colaborador ${colaborador.nomeColaborador}?`)) {
      setIsDeleting(true);
      try {
        await deletar(`/colaboradores/${colaborador.id}`);
        window.location.reload(); // Recarrega a página para atualizar a lista
      } catch (error) {
        console.error("Erro ao deletar colaborador:", error);
        alert("Erro ao deletar colaborador. Tente novamente.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Função para editar colaborador
  const handleEdit = () => {
    setIsEditing(true);
    navigate(`/editarcolaborador/${colaborador.id}`);
  };

  // Função para calcular salário (placeholder)
  const handleCalculateSalary = () => {
    alert(`Calculando salário para ${colaborador.nomeColaborador}...`);
  };

  // Obter inicial do nome para avatar
  const getInitials = (nome: string): string => {
    return nome
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const idade = calcularIdade(colaborador.dataNascimento);

  return (
    <div 
      className="relative rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
      style={{ backgroundColor: COLORS.cardBackground }}
    >
      {/* Header do Card */}
      <div 
        className="p-6 pb-4"
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary}05, ${COLORS.accent3}05)`
        }}
      >
        <div className="flex items-start justify-between mb-4">
          {/* Avatar e Nome */}
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg relative overflow-hidden"
              style={{ backgroundColor: COLORS.primary }}
            >
              {isEditing ? (
                <RotatingLines strokeColor="white" strokeWidth="3" animationDuration="0.75" width="20" visible={true} />
              ) : (
                getInitials(colaborador.nomeColaborador)
              )}
              
              {/* Indicador de status */}
              <div 
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                style={{ backgroundColor: COLORS.success }}
              ></div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {colaborador.nomeColaborador}
              </h3>
              <div className="flex items-center space-x-2">
                <Icon type="briefcase" className="w-4 h-4" style={{ color: COLORS.accent2 }} />
                <span className="text-sm font-medium" style={{ color: COLORS.accent1 }}>
                  {colaborador.cargo}
                </span>
              </div>
            </div>
          </div>

          {/* Botão Calcular Salário */}
          <button
            onClick={handleCalculateSalary}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:shadow-md"
            style={{ 
              backgroundColor: `${COLORS.accent4}30`,
              color: COLORS.accent1,
              border: `1px solid ${COLORS.accent4}50`
            }}
          >
            <Icon type="calculator" className="w-3 h-3" />
            <span>Calcular</span>
          </button>
        </div>

        {/* Badge do Departamento */}
        <div className="mb-4">
          <DepartmentBadge departmentName={colaborador.departamento?.nome || "Sem Departamento"} />
        </div>
      </div>

      {/* Corpo do Card */}
      <div className="px-6 pb-6">
        {/* Informações */}
        <div className="space-y-3 mb-6">
          {/* Salário */}
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: `${COLORS.success}10` }}>
            <div className="flex items-center space-x-2">
              <Icon type="currency" style={{ color: COLORS.success }} />
              <span className="text-sm font-medium text-gray-600">Salário</span>
            </div>
            <span className="text-lg font-bold" style={{ color: COLORS.success }}>
              {formatarSalario(colaborador.salario)}
            </span>
          </div>

          {/* Data de Nascimento e Idade */}
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: `${COLORS.accent3}10` }}>
            <div className="flex items-center space-x-2">
              <Icon type="calendar" style={{ color: COLORS.accent2 }} />
              <span className="text-sm font-medium text-gray-600">Nascimento</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-800">
                {formatarData(colaborador.dataNascimento)}
              </div>
              <div className="text-xs" style={{ color: COLORS.accent2 }}>
                {idade} anos
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            disabled={isEditing || isDeleting}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: COLORS.primary }}
            onMouseEnter={(e) => {
              if (!isEditing && !isDeleting) {
                e.currentTarget.style.backgroundColor = COLORS.primaryHover;
              }
            }}
            onMouseLeave={(e) => {
              if (!isEditing && !isDeleting) {
                e.currentTarget.style.backgroundColor = COLORS.primary;
              }
            }}
          >
            {isEditing ? (
              <RotatingLines strokeColor="white" strokeWidth="3" animationDuration="0.75" width="16" visible={true} />
            ) : (
              <>
                <Icon type="edit" className="w-4 h-4" />
                <span>Editar</span>
              </>
            )}
          </button>

          <button
            onClick={handleDelete}
            disabled={isEditing || isDeleting}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: COLORS.danger }}
            onMouseEnter={(e) => {
              if (!isEditing && !isDeleting) {
                e.currentTarget.style.backgroundColor = "#DC2626";
              }
            }}
            onMouseLeave={(e) => {
              if (!isEditing && !isDeleting) {
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
          background: `linear-gradient(135deg, ${COLORS.primary}05, ${COLORS.accent3}05)`,
          border: `1px solid ${COLORS.primary}20`
        }}
      ></div>
    </div>
  );
};

export default CardColaboradores;

