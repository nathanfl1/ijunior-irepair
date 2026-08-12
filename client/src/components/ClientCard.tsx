// src/components/ClientCard.tsx
import type { Client } from "../interfaces/Client";

interface ClientCardProps {
    client: Client;
    onDeleteSuccess: (id: number) => void;
}

const ClientCard = ({ client, onDeleteSuccess }: ClientCardProps) => {
    const formattedDate = client.createdAt
        ? new Date(client.createdAt).toLocaleDateString('pt-BR')
        : 'Data indisponível';

    async function handleDelete() {
        const confirmou = window.confirm(
            `Tem certeza que deseja deletar o cliente ${client.name}? Todas as ordens de serviço dele também serão apagadas.`
        );

        if (confirmou) {
            onDeleteSuccess(client.id);
        }
    }

    return (
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
            <div>
                <h3 className="font-bold text-xl mb-2 text-gray-800">
                    {client.name}
                </h3>
                <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Telefone:</span> {client.phone}
                </p>
                <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Email:</span> {client.email || 'Não informado'}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                    Cadastrado em: {formattedDate}
                </p>
            </div>

            <button
                onClick={handleDelete}
                className="w-full bg-red-50 text-red-600 border border-red-200 py-1.5 rounded hover:bg-red-100 transition-colors font-medium text-sm"
            >
                Deletar Cliente
            </button>
        </div>
    );
};

export default ClientCard;