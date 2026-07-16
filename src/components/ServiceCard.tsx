import type { OrdemServico } from "../interfaces/OrdemServico";

interface Props {
    ordem: OrdemServico;
    avancarStatus: (id: number) => void;
}

function ServiceCard({ ordem, avancarStatus }: Props) {
    const corStatus = {
        "Aberto": "bg-green-500",
        "Em andamento": "bg-yellow-500",
        "Finalizado": "bg-gray-500",
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-4">

            <h3 className="text-lg font-bold">
                {ordem.cliente}
            </h3>

            <p>
                <strong>Aparelho:</strong> {ordem.aparelho}
            </p>

            <p>
                <strong>Defeito:</strong> {ordem.defeito}
            </p>

            <div className="flex items-center gap-2 mt-3">
                <span
                    className={`text-white px-3 py-1 rounded ${corStatus[ordem.status]}`}
                >
                    {ordem.status}
                </span>

                {ordem.status !== "Finalizado" && (
                    <button
                        onClick={() => avancarStatus(ordem.id)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                        Avançar status
                    </button>
                )}
            </div>
        </div>
    );
}

export default ServiceCard;