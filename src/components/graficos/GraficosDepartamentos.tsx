// src/components/graficos/GraficosDepartamentos.tsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type Departamento from "../../models/Departamento";

type Props = {
  departamentos: Departamento[];
};

export function GraficosDepartamentos({ departamentos }: Props) {
  const dados = prepararDadosGrafico(departamentos);

  return (
    <div className="space-y-12 p-4">
      {/* Orçamento por departamento */}
      <div className="w-full h-64 bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Orçamento por Departamento</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dados}>
            <XAxis dataKey="departamento" />
            <YAxis />
            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
            <Bar dataKey="orcamento" fill="#0F3057" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quantidade de colaboradores */}
      <div className="w-full h-64 bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Quantidade de Colaboradores por Departamento</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dados}>
            <XAxis dataKey="departamento" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="qtdColaboradores" fill="#1B98F5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Salário médio */}
      <div className="w-full h-64 bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Salário Médio por Departamento</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dados}>
            <XAxis dataKey="departamento" />
            <YAxis />
            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
            <Bar dataKey="salarioMedio" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function prepararDadosGrafico(departamentos: Departamento[]) {
  return departamentos.map(depto => {
    const colaboradores = depto.colaborador ?? [];
    const somaSalarios = colaboradores.reduce((acc, c) => acc + c.salario, 0);
    const qtdColabs = colaboradores.length;
    const salarioMedio = qtdColabs > 0 ? somaSalarios / qtdColabs : 0;

    return {
      departamento: depto.nome,
      orcamento: depto.orcamento,
      qtdColaboradores: qtdColabs,
      salarioMedio,
    };
  });
}
