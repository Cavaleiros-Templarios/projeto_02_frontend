import React, { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { buscar } from "../../services/Service";
import type Departamento from "../../models/Departamento";
import type Colaborador from "../../models/Colaborador";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area,
  RadialBarChart, RadialBar, ComposedChart, CartesianGrid
} from "recharts";

// Paleta de cores predominantemente verde com branco suave
const COLORS = {
  primary: "#015B46",        // Verde principal
  primaryHover: "#003C2D",   // Verde escuro para hover
  background: "#f3f4f6",     // Fundo claro
  cardBackground: "#f9fafb", // Branco menos vibrante para cards
  tooltipBackground: "#f8fafc", // Branco suave para tooltips
  accent1: "#047857",        // Verde médio escuro
  accent2: "#059669",        // Verde médio
  accent3: "#10B981",        // Verde claro
  accent4: "#34D399",        // Verde muito claro
  accent5: "#6EE7B7",        // Verde pastel
  accent6: "#A7F3D0",        // Verde muito pastel
  success: "#22C55E",        // Verde sucesso
  warning: "#047857"         // Verde para avisos (substituindo laranja)
};

// Paleta de cores para gráficos - todas em tons de verde
const CHART_COLORS = [
  COLORS.primary,      // #015B46 - Verde principal
  COLORS.accent1,      // #047857 - Verde médio escuro
  COLORS.accent2,      // #059669 - Verde médio
  COLORS.accent3,      // #10B981 - Verde claro
  COLORS.accent4,      // #34D399 - Verde muito claro
  COLORS.accent5,      // #6EE7B7 - Verde pastel
  COLORS.accent6,      // #A7F3D0 - Verde muito pastel
  COLORS.success       // #22C55E - Verde sucesso
];

// Componente de Ícone SVG simples
const Icon: React.FC<{ type: string; className?: string; style?: React.CSSProperties }> = ({ 
  type, 
  className = "w-6 h-6", 
  style 
}) => {
  const icons: Record<string, JSX.Element> = {
    users: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
      </svg>
    ),
    building: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
      </svg>
    ),
    dollar: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
      </svg>
    ),
    target: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
      </svg>
    ),
    trending: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/>
      </svg>
    ),
    calendar: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
      </svg>
    ),
    chart: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
      </svg>
    ),
    pie: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
      </svg>
    ),
    activity: (
      <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
      </svg>
    )
  };

  return icons[type] || <div className={className} style={style}>📊</div>;
};

// Componente de Card Estatística com branco suave
interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color, delay = 0 }) => (
  <div 
    className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-l-4 group"
    style={{ 
      backgroundColor: COLORS.cardBackground, // Branco menos vibrante
      borderLeftColor: color,
      animationDelay: `${delay}ms`
    }}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 mb-2 group-hover:text-gray-700 transition-colors">
          {title}
        </p>
        <p className="text-3xl font-bold mb-2 transition-all duration-300" style={{ color }}>
          {value}
        </p>
        {trend && (
          <div className={`flex items-center text-sm font-medium`} style={{ color: trend.isPositive ? COLORS.success : COLORS.warning }}>
            <span className="mr-1">{trend.isPositive ? '↗️' : '↘️'}</span>
            {trend.value}
          </div>
        )}
      </div>
      <div 
        className="p-4 rounded-xl transition-all duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon type={icon} className="w-8 h-8" style={{ color }} />
      </div>
    </div>
  </div>
);

// Componente de Container de Gráfico com branco suave
interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  icon?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ 
  title, 
  subtitle, 
  children, 
  className = "",
  icon 
}) => (
  <div 
    className={`rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${className}`}
    style={{ backgroundColor: COLORS.cardBackground }} // Branco menos vibrante
  >
    <div className="flex items-center justify-between mb-6">
      <div>
        <div className="flex items-center mb-2">
          {icon && (
            <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: `${COLORS.primary}15` }}>
              <Icon type={icon} className="w-5 h-5" style={{ color: COLORS.primary }} />
            </div>
          )}
          <h3 className="text-xl font-bold" style={{ color: COLORS.primary }}>{title}</h3>
        </div>
        {subtitle && (
          <p className="text-sm" style={{ color: COLORS.accent1 }}>{subtitle}</p>
        )}
      </div>
      <div 
        className="w-1 h-12 rounded-full"
        style={{ 
          background: `linear-gradient(to bottom, ${COLORS.primary}, ${COLORS.accent3})` 
        }}
      ></div>
    </div>
    <div className="chart-fade-in">
      {children}
    </div>
  </div>
);

// Tooltip customizado com branco suave
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="p-4 rounded-xl shadow-lg border-2" 
        style={{ 
          backgroundColor: COLORS.tooltipBackground, // Branco suave para tooltip
          borderColor: COLORS.primary 
        }}
      >
        <p className="font-semibold mb-2" style={{ color: COLORS.primary }}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatter ? formatter(entry.value) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Estatisticas() {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function carregarDados() {
      setLoading(true);
      await buscar("/departamento", setDepartamentos);
      await buscar("/colaboradores", setColaboradores);
      setLoading(false);
    }
    carregarDados();
  }, []);

  // Cálculos para estatísticas gerais
  const totalColaboradores = colaboradores.length;
  const totalDepartamentos = departamentos.length;
  const salarioMedio = colaboradores.length > 0 
    ? colaboradores.reduce((acc, c) => acc + c.salario, 0) / colaboradores.length 
    : 0;
  const orcamentoTotal = departamentos.reduce((acc, d) => acc + d.orcamento, 0);

  // Gráfico: colaboradores por departamento (pizza)
  const dadosColabPorDepto = (() => {
    const map: Record<string, number> = {};
    colaboradores.forEach((c) => {
      const nome = c.departamento?.nome ?? "Sem Departamento";
      map[nome] = (map[nome] || 0) + 1;
    });
    return Object.entries(map).map(([nome, value]) => ({ nome, value }));
  })();

  // Gráfico: salário médio por cargo
  const dadosSalarioPorCargo = (() => {
    const map: Record<string, { soma: number; qtd: number }> = {};
    colaboradores.forEach((c) => {
      if (!map[c.cargo]) map[c.cargo] = { soma: 0, qtd: 0 };
      map[c.cargo].soma += c.salario;
      map[c.cargo].qtd++;
    });
    return Object.entries(map).map(([cargo, val]) => ({
      cargo,
      salarioMedio: Math.round(val.soma / val.qtd),
      quantidade: val.qtd
    }));
  })();

  // Gráfico: distribuição de idades
  const dadosIdades = (() => {
    const faixasEtarias: Record<string, number> = {
      "18-25": 0,
      "26-35": 0,
      "36-45": 0,
      "46-55": 0,
      "56+": 0
    };
    
    colaboradores.forEach((c) => {
      const idade = new Date().getFullYear() - new Date(c.dataNascimento).getFullYear();
      if (idade <= 25) faixasEtarias["18-25"]++;
      else if (idade <= 35) faixasEtarias["26-35"]++;
      else if (idade <= 45) faixasEtarias["36-45"]++;
      else if (idade <= 55) faixasEtarias["46-55"]++;
      else faixasEtarias["56+"]++;
    });

    return Object.entries(faixasEtarias).map(([faixa, quantidade]) => ({
      faixa,
      quantidade
    }));
  })();

  // Gráfico: orçamento vs colaboradores por departamento
  const dadosDeptoCompleto = departamentos.map((d) => {
    const qtdColaboradores = colaboradores.filter(c => c.departamento?.id === d.id).length;
    return {
      nome: d.nome,
      orcamento: d.orcamento,
      colaboradores: qtdColaboradores,
      orcamentoPorColaborador: qtdColaboradores > 0 ? Math.round(d.orcamento / qtdColaboradores) : 0
    };
  });

  // Dados simulados para evolução temporal
  const dadosEvolucao = [
    { mes: "Jan", colaboradores: totalColaboradores - 5, orcamento: orcamentoTotal * 0.8 },
    { mes: "Fev", colaboradores: totalColaboradores - 3, orcamento: orcamentoTotal * 0.85 },
    { mes: "Mar", colaboradores: totalColaboradores - 2, orcamento: orcamentoTotal * 0.9 },
    { mes: "Abr", colaboradores: totalColaboradores - 1, orcamento: orcamentoTotal * 0.95 },
    { mes: "Mai", colaboradores: totalColaboradores, orcamento: orcamentoTotal },
  ];

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="text-center">
          <DNA visible={true} height={200} width={200} ariaLabel="loading" />
          <p className="mt-6 text-lg font-medium" style={{ color: COLORS.primary }}>
            Carregando estatísticas...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-5xl font-bold mb-4"
            style={{ 
              background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.accent3})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            📊 Estatísticas
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: COLORS.accent1 }}>
            Análise completa e insights estratégicos dos dados organizacionais
          </p>
        </div>

        {/* Cards de Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total de Colaboradores"
            value={totalColaboradores}
            icon="users"
            trend={{ value: "+12% este mês", isPositive: true }}
            color={COLORS.primary}
            delay={0}
          />
          <StatCard
            title="Departamentos Ativos"
            value={totalDepartamentos}
            icon="building"
            trend={{ value: "+2 novos", isPositive: true }}
            color={COLORS.accent1}
            delay={100}
          />
          <StatCard
            title="Salário Médio"
            value={`R$ ${salarioMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon="dollar"
            trend={{ value: "+8% este ano", isPositive: true }}
            color={COLORS.accent2}
            delay={200}
          />
          <StatCard
            title="Orçamento Total"
            value={`R$ ${orcamentoTotal.toLocaleString('pt-BR')}`}
            icon="target"
            trend={{ value: "95% utilizado", isPositive: false }}
            color={COLORS.accent3}
            delay={300}
          />
        </div>

        {/* Grid Principal de Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Gráfico de Pizza - Colaboradores por Departamento */}
          <ChartContainer 
            title="Distribuição por Departamento" 
            subtitle="Visualização da distribuição de colaboradores"
            icon="pie"
          >
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={dadosColabPorDepto}
                  dataKey="value"
                  nameKey="nome"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  innerRadius={70}
                  paddingAngle={5}
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {dadosColabPorDepto.map((_, index) => (
                    <Cell 
                      key={index} 
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip formatter={(value: number) => `${value} colaboradores`} />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Gráfico de Barras - Salário por Cargo */}
          <ChartContainer 
            title="Análise Salarial por Cargo" 
            subtitle="Comparativo de remuneração média"
            icon="chart"
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dadosSalarioPorCargo}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="cargo" 
                  tick={{ fontSize: 12, fill: COLORS.accent1 }}
                  height={50}
                />
                <YAxis tick={{ fontSize: 12, fill: COLORS.accent1 }} />
                <Tooltip content={<CustomTooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />} />
                <Bar 
                  dataKey="salarioMedio" 
                  fill={COLORS.primary}
                  radius={[8, 8, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Segunda linha de gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Gráfico de Área - Distribuição de Idades */}
          <ChartContainer 
            title="Distribuição Etária" 
            subtitle="Análise demográfica da equipe"
            icon="calendar"
          >
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={dadosIdades}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="faixa" tick={{ fontSize: 12, fill: COLORS.accent1 }} />
                <YAxis tick={{ fontSize: 12, fill: COLORS.accent1 }} />
                <Tooltip content={<CustomTooltip formatter={(value: number) => `${value} colaboradores`} />} />
                <Area 
                  type="monotone" 
                  dataKey="quantidade" 
                  stroke={COLORS.accent2}
                  fill={COLORS.accent2}
                  fillOpacity={0.7}
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Gráfico de Barras Radiais - Eficiência Orçamentária */}
          <ChartContainer 
            title="Eficiência Orçamentária" 
            subtitle="Orçamento por colaborador por departamento"
            icon="activity"
          >
            <ResponsiveContainer width="100%" height={350}>
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="30%" 
                outerRadius="90%" 
                data={dadosDeptoCompleto}
              >
                <RadialBar 
                  dataKey="orcamentoPorColaborador" 
                  cornerRadius={10} 
                  fill={COLORS.accent1}
                  animationDuration={2500}
                />
                <Tooltip content={<CustomTooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />} />
                <Legend />
              </RadialBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Gráfico de Linha - Evolução Temporal */}
        <ChartContainer 
          title="Evolução Temporal" 
          subtitle="Crescimento de colaboradores e orçamento ao longo do tempo"
          icon="trending"
          className="mb-8"
        >
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={dadosEvolucao}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: COLORS.accent1 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: COLORS.accent1 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: COLORS.accent1 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                yAxisId="right"
                dataKey="orcamento" 
                fill={COLORS.primary}
                name="Orçamento (R$)"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="colaboradores" 
                stroke={COLORS.accent3}
                strokeWidth={4}
                name="Colaboradores"
                animationDuration={2000}
                dot={{ fill: COLORS.accent3, strokeWidth: 2, r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Estilos CSS sem atributo jsx */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .chart-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }
          
          .recharts-wrapper {
            transition: transform 0.3s ease;
          }
          
          .recharts-wrapper:hover {
            transform: scale(1.02);
          }
          
          .recharts-tooltip-wrapper {
            filter: drop-shadow(0 8px 16px rgba(1, 91, 70, 0.2));
          }
          
          /* Customização adicional para elementos Recharts */
          .recharts-legend-item-text {
            color: ${COLORS.accent1} !important;
          }
          
          .recharts-cartesian-axis-tick-value {
            fill: ${COLORS.accent1} !important;
          }
        `}
      </style>
    </div>
  );
}

