// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { ServiceOrder } from "../interfaces/ServiceOrder";
import ServiceCard from "../components/ServiceCard";

const Dashboard = () => {
    const [orders, setOrders] = useState<ServiceOrder[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadOrders() {
        try {
            const response = await api.get("/service-orders");
            setOrders(response.data);
        } catch (error) {
            console.error("Erro ao buscar ordens:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadOrders();
    }, []);

    // Função que recebe o ID da ordem deletada lá do ServiceCard 
    // e atualiza a tela instantaneamente
    function removeOrderFromState(idDeleted: number) {
        setOrders(orders.filter(order => order.id !== idDeleted));
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <h2 className="text-xl font-medium text-gray-600">
                    Carregando ordens de serviço...
                </h2>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Dashboard
            </h1>

            {orders.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                    <p className="text-gray-500 text-lg">
                        Nenhuma ordem de serviço encontrada.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map(order => (
                        <ServiceCard
                            key={order.id}
                            order={order}
                            onDeleteSuccess={removeOrderFromState}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;