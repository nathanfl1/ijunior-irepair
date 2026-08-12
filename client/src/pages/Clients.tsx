// src/pages/Clients.tsx
import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Client } from "../interfaces/Client";
import ClientCard from "../components/ClientCard";
import NewClientForm from "../components/NewClientForm";

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

    async function createClient(clientData: Omit<Client, "id" | "createdAt" | "updatedAt">) {
        try {
            await api.post("/clients", clientData);
            loadClients(); // Recarrega a lista do banco após cadastrar
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
        }
    }

    async function deleteClient(id: number) {
        try {
            await api.delete(`/clients/${id}`);
            loadClients(); // Recarrega a lista do banco após excluir
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        }
    }

    useEffect(() => {
        loadClients();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <h2 className="text-xl font-medium text-gray-600">
                    Carregando clientes...
                </h2>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Clients
            </h1>

            {/* Formulário de cadastro na mesma página */}
            <div className="mb-8">
                <NewClientForm createClient={createClient} />
            </div>

            {/* Listagem de Clientes */}
            {clients.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                    <p className="text-gray-500 text-lg">
                        Nenhum cliente cadastrado no banco de dados.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {clients.map(client => (
                        <ClientCard
                            key={client.id}
                            client={client}
                            onDeleteSuccess={() => deleteClient(client.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Clients;