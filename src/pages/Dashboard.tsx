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

    if (loading) {

        return (

            <h2 className="text-center text-xl mt-10">

                Loading...

            </h2>

        );

    }
    return (

        <div className="max-w-7xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">

                Dashboard

            </h1>

            <div className="grid grid-cols-3 gap-6">

                {

                    orders.map(order => (

                        <ServiceCard
                            key={order.id}
                            order={order}
                        />

                    ))

                }

            </div>

        </div>

    );

};

export default Dashboard;