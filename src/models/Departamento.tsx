import type Colaborador from "./Colaborador";


export default interface Departamento {
    id: number | undefined;
    nome: string;
    orcamento: number;
    colaborador: Colaborador | null;
}