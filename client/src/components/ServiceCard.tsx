import type { ServiceOrder } from "../interfaces/ServiceOrder";

interface ServiceCardProps {

    order: ServiceOrder;

}

const ServiceCard = ({ order }: ServiceCardProps) => {

    const statusColor = {

        open: "bg-green-500",

        in_progress: "bg-yellow-500",

        done: "bg-red-500"

    };

    const statusText = {

        open: "Aberto",

        in_progress: "Em andamento",

        done: "Finalizado"

    };

    return (

        <div className="bg-white rounded-lg shadow p-4 border">

            <h2 className="text-lg font-bold">

                {order.device}

            </h2>

            <p className="mt-2">

                <strong>Issue:</strong> {order.issue}

            </p>

            <p>

                <strong>Client ID:</strong> {order.client_id}

            </p>

            <p className="text-sm text-gray-500 mt-2">

                {new Date(order.created_at).toLocaleDateString()}

            </p>

            <span
                className={`inline-block mt-4 text-white px-3 py-1 rounded ${statusColor[order.status]}`}
            >

                {statusText[order.status]}

            </span>

        </div>

    );

};

export default ServiceCard;