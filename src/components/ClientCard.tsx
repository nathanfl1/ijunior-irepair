import type { Client } from "../interfaces/Client";

interface ClientCardProps {
    client: Client;
    deleteClient: (id: number) => void;
}

const ClientCard = ({ client, deleteClient }: ClientCardProps) => {

    return (
        <div className="bg-white shadow rounded-lg p-4 border">

            <h2 className="text-xl font-bold">
                {client.name}
            </h2>

            <p className="text-gray-600 mt-2">
                📞 {client.phone}
            </p>

            <p className="text-gray-600">
                📧 {client.email}
            </p>

            <p className="text-sm text-gray-400 mt-2">
                Criado em: {new Date(client.created_at).toLocaleDateString()}
            </p>

            <button
                onClick={() => deleteClient(client.id)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
                Excluir
            </button>

        </div>
    );

};

export default ClientCard;