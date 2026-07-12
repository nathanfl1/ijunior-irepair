export interface OrdemServico {
    id: number;
    cliente: string;
    defeito: string;
    aparelho: string;
    status: "Aberto" | "Em andamento" | "Finalizado";
}