import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type Colaborador from "../../models/Colaborador";

type Props = {
  colaboradores: Colaborador[];
};

export function GraficosColaboradores({ colaboradores }: Props) {
  const dadosSalarioMedio = salarioMedioPorDepartamento(colaboradores);
  const dadosPorCargo = colaboradoresPorCargo(colaboradores);

  return (
    <div className="space-y-12 p-4">
      {/* Gráfico: Salário médio por departamento */}
      <div className="w-full h-64 bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">
          Salário Médio por Departamento
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dadosSalarioMedio}>
            <XAxis dataKey="departamento" />
            <YAxis />
            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
            <Bar dataKey="salarioMedio" fill="#0F3057" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico: Quantidade de colaboradores por cargo */}
      <div className="w-full h-64 bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">
          Quantidade de Colaboradores por Cargo
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dadosPorCargo}>
            <XAxis dataKey="cargo" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="qtd" fill="#1B98F5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Função: salário médio por departamento
function salarioMedioPorDepartamento(colaboradores: Colaborador[]) {
  const mapa: Record<string, { soma: number; qtd: number }> = {};

  colaboradores.forEach((colab) => {
    const depto = colab.departamento?.nome ?? "Sem departamento";
    if (!mapa[depto]) mapa[depto] = { soma: 0, qtd: 0 };
    mapa[depto].soma += colab.salario;
    mapa[depto].qtd++;
  });

  return Object.entries(mapa).map(([departamento, { soma, qtd }]) => ({
    departamento,
    salarioMedio: soma / qtd,
  }));
}

// Função: quantidade de colaboradores por cargo
function colaboradoresPorCargo(colaboradores: Colaborador[]) {
  const mapa: Record<string, number> = {};

  colaboradores.forEach((colab) => {
    const cargo = colab.cargo;
    mapa[cargo] = (mapa[cargo] || 0) + 1;
  });

  return Object.entries(mapa).map(([cargo, qtd]) => ({
    cargo,
    qtd,
  }));
}
