import type { Client } from "../interfaces/Client";
import type { ServiceOrder } from "../interfaces/ServiceOrder";

interface ServiceOrderCardProps {

    order: ServiceOrder;

    clients: Client[];

    deleteOrder: (id: number) => void;

    advanceStatus: (order: ServiceOrder) => void;

}

const ServiceOrderCard = ({
    order,
    clients,
    deleteOrder,
    advanceStatus
}: ServiceOrderCardProps) => {

    const client = clients.find(
        (client) => client.id === order.clientId
    );

    const statusColor = {

        OPEN: "bg-green-500",

        IN_PROGRESS: "bg-yellow-500",

        CLOSED: "bg-red-500"

    };

    const statusText = {
        OPEN: "Aberto",
        IN_PROGRESS: "Em andamento",
        CLOSED: "Finalizado"
    };

    return (

        <div className="bg-white rounded-lg shadow p-5 border">

            <h2 className="text-xl font-bold mb-3">

                {order.device}

            </h2>

            <p className="mb-2">

                <strong>Client:</strong>{" "}
                {client ? client.name : "Unknown"}

            </p>

            <p className="mb-2">

                <strong>Issue:</strong>{" "}
                {order.description}

            </p>

            <span
                className={`inline-block px-3 py-1 rounded text-white ${statusColor[order.status]}`}
            >

                {statusText[order.status]}

            </span>

            {

                order.status !== "CLOSED" && (

                    <button
                        onClick={() => {
                            advanceStatus(order);
                        }}
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                    >

                        Avançar Status

                    </button>

                )

            }

            <button
                onClick={() => deleteOrder(order.id)}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
            >

                Delete

            </button>

            <p className="text-sm text-gray-500 mt-4">

                Created at{" "}
                {new Date(order.createdAt).toLocaleDateString()}

            </p>

        </div>

    );

};

export default ServiceOrderCard;