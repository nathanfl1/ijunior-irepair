import { api } from "../services/api";
import type { ServiceOrder } from "../interfaces/ServiceOrder";

function formatStatus(status: string) : string
{
    var statusFormatado = "";
    switch(status)
    {
        case "OPEN": statusFormatado = "Aberto"; break;
        case "IN_PROGRESS": statusFormatado = "Em Progresso"; break;
        case "CLOSED": statusFormatado = "Finalizado"; break;
    }
    return statusFormatado;
}

interface ServiceCardProps {
    order: ServiceOrder;
    // Nova prop: uma função que o Dashboard vai passar para atualizar a tela
    onDeleteSuccess: (id: number) => void; 
}

const ServiceCard = ({ order, onDeleteSuccess }: ServiceCardProps) => {
    const formattedDate = order.createdAt 
        ? new Date(order.createdAt).toLocaleDateString('pt-BR') 
        : 'Data indisponível';

    async function handleDelete() {
        // Confirmação nativa do navegador
        const confirmou = window.confirm("Tem certeza que deseja deletar esta ordem de serviço?");
        
        if (confirmou) {
            try {
                // Chama a rota de delete que criamos no back-end
                await api.delete(`/service-orders/${order.id}`);
                
                // Avisa o Dashboard para tirar esse card da tela imediatamente
                onDeleteSuccess(order.id);
            } catch (error) {
                console.error("Erro ao deletar:", error);
                alert("Erro ao tentar deletar a ordem.");
            }
        }
    }

    return (
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
            <div>
                <h3 className="font-bold text-xl mb-2 text-gray-800">
                    {order.device}
                </h3>
                <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Issue:</span> {order.description}
                </p>
                <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Client ID:</span> {order.clientId}
                </p>
                <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Status:</span> {formatStatus(order.status)}
                </p>

                <p className="text-sm text-gray-400 mb-4">
                    {formattedDate}
                </p>
            </div>

            {}
            <button 
                onClick={handleDelete}
                className="w-full bg-red-50 text-red-600 border border-red-200 py-1.5 rounded hover:bg-red-100 transition-colors font-medium text-sm"
            >
                Deletar Ordem
            </button>
        </div>
    );
};

export default ServiceCard;