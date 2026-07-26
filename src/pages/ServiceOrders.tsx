import { useEffect, useState } from "react";

import { api } from "../services/api";

import type { Client } from "../interfaces/Client";
import type { ServiceOrder } from "../interfaces/ServiceOrder";

import NewServiceOrderForm from "../components/NewServiceOrderForm";
import ServiceOrderCard from "../components/ServiceOrderCard";

const ServiceOrders = () => {

    const [orders, setOrders] = useState<ServiceOrder[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadOrders() {

        try {

            const response = await api.get("/service-orders");

            setOrders(response.data);

        } catch (error) {

            console.error("Erro ao buscar ordens:", error);

        }

    }

    async function loadClients() {

        try {

            const response = await api.get("/clients");

            setClients(response.data);

        } catch (error) {

            console.error("Erro ao buscar clientes:", error);

        }

    }

    async function createOrder(order: {
        clientId: number;
        device: string;
        issue: string;
        status: "open" | "in_progress" | "done";
    }) {

        try {

            await api.post("/service-orders", order);

            await loadOrders();

        } catch (error) {

            console.error("Erro ao criar ordem:", error);

        }

    }

    async function deleteOrder(id: number) {

        try {

            await api.delete(`/service-orders/${id}`);

            await loadOrders();

        } catch (error) {

            console.error("Erro ao excluir ordem:", error);

        }

    }

    useEffect(() => {

        async function loadData() {

            setLoading(true);

            await Promise.all([
                loadOrders(),
                loadClients()
            ]);

            setLoading(false);

        }

        loadData();

    }, []);

    if (loading) {

        return (

            <h2 className="text-center text-xl mt-10">

                Loading...

            </h2>

        );

    }

    async function advanceStatus(order: ServiceOrder) {

        let newStatus: "open" | "in_progress" | "done";
        switch (order.status) {

            case "open":
                newStatus = "in_progress";
                break;

            case "in_progress":
                newStatus = "done";
                break;

            default:
                return;

        }

        try {
            console.log({
                clientId: order.client_id,
                device: order.device,
                issue: order.issue,
                status: newStatus
            });

            await api.put(`/service-orders/${order.id}`, {
                clientId: order.client_id,
                device: order.device,
                issue: order.issue,
                status: newStatus
            });

            await api.put(`/service-orders/${order.id}`, {

                clientId: order.client_id,
                device: order.device,
                issue: order.issue,
                status: newStatus

            });

            await loadOrders();

        } catch (error: any) {

            console.error("Status:", error.response?.status);
            console.error("Resposta:", error.response?.data);
            console.error("Erro completo:", error.response);

        }

    }
    return (

        <div className="max-w-7xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">

                Service Orders

            </h1>

            <NewServiceOrderForm
                clients={clients}
                createOrder={createOrder}
            />

            <div className="grid grid-cols-3 gap-6 mt-8">

                {

                    orders.map(order => (

                        <ServiceOrderCard
                            key={order.id}
                            order={order}
                            deleteOrder={deleteOrder}
                            advanceStatus={advanceStatus}
                            clients={clients}
                        />

                    ))

                }

            </div>

        </div>

    );

};

export default ServiceOrders;