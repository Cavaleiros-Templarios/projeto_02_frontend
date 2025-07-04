import type Departamento from "./Departamento";

export default interface Colaborador {
    id: number | undefined;
    salario: number;
    cargo: string;
    nomeColaborador: string;
    dataNascimento: string;
    departamento: Departamento | null;
}