import { useEffect, useState } from "react";

import { api } from "../services/api";

import type { Client } from "../interfaces/Client";

import ClientCard from "../components/ClientCard.tsx";
import NewClientForm from "../components/NewClientForm.tsx";

const Clients = () => {

    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadClients() {

        try {

            const response = await api.get("/clients");

            setClients(response.data);

        } catch (error) {

            console.error("Erro ao buscar clientes:", error);

        } finally {

            setLoading(false);

        }

    }

    async function createClient(client: Omit<Client, "id" | "created_at">) {

            console.log(client);
        try {

            await api.post("/clients", client);

            loadClients();

        } catch (error) {

            console.error("Erro ao criar cliente:", error);

        }

    }

    async function deleteClient(id: number) {

        try {

            await api.delete(`/clients/${id}`);

            loadClients();

        } catch (error) {

            console.error("Erro ao excluir cliente:", error);

        }

    }

    useEffect(() => {

        loadClients();

    }, []);

    if (loading) {

        return (

            <h2 className="text-center text-xl mt-10">

                Loading...

            </h2>

        );

    }

    return (

        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">

                Clients

            </h1>

            <NewClientForm
                createClient={createClient}
            />

            <div className="grid grid-cols-2 gap-4 mt-6">

                {

                    clients.map(client => (

                        <ClientCard
                            key={client.id}
                            client={client}
                            deleteClient={deleteClient}
                        />

                    ))

                }

            </div>

        </div>

    );

};

export default Clients;