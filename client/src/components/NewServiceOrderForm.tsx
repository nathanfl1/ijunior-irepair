import { useState } from "react";

import type { Client } from "../interfaces/Client";

interface NewServiceOrderFormProps {
    clients: Client[];

    createOrder: (order: {
        clientId: number;
        device: string;
        description: string;
        status: "OPEN" | "IN_PROGRESS" | "CLOSED";
    }) => void;
}

const NewServiceOrderForm = ({
    clients,
    createOrder
}: NewServiceOrderFormProps) => {

    const [clientId, setClientId] = useState<number>(0);
    const [device, setDevice] = useState("");
    const [description, setIssue] = useState("");
    const [status, setStatus] = useState<"OPEN" | "IN_PROGRESS" | "CLOSED">("OPEN");

    const [error, setError] = useState("");

    function handleSubmit() {

        if (clientId === 0 || !device || !description) {

            setError("Preencha todos os campos!");

            return;

        }

        createOrder({

            clientId,
            device,
            description,
            status

        });

        setClientId(0);
        setDevice("");
        setIssue("");
        setStatus("OPEN");

        setError("");

    }

    return (

        <div className="bg-white rounded-lg shadow p-6">

            <h2 className="text-2xl font-bold mb-4">

                Nova Ordem de Serviço

            </h2>

            <div className="flex flex-col gap-4">

                <select
                    className="border rounded p-2"
                    value={clientId}
                    onChange={(e) => {

                        setClientId(Number(e.target.value));
                        setError("");

                    }}
                >

                    <option value={0}>

                        Selecione um cliente

                    </option>

                    {

                        clients.map(client => (

                            <option
                                key={client.id}
                                value={client.id}
                            >

                                {client.name}

                            </option>

                        ))

                    }

                </select>

                <input
                    className="border rounded p-2"
                    placeholder="Device"
                    value={device}
                    onChange={(e) => {

                        setDevice(e.target.value);
                        setError("");

                    }}
                />

                <input
                    className="border rounded p-2"
                    placeholder="Issue"
                    value={description}
                    onChange={(e) => {

                        setIssue(e.target.value);
                        setError("");

                    }}
                />

                <select
                    className="border rounded p-2"
                    value={status}
                    onChange={(e) =>
                        setStatus(
                            e.target.value as "OPEN" | "IN_PROGRESS" | "CLOSED"
                        )
                    }
                >

                    <option value="OPEN">

                        Aberto

                    </option>

                    <option value="IN_PROGRESS">

                        Em andamento

                    </option>

                    <option value="CLOSED">

                        Finalizado

                    </option>

                </select>

                {

                    error && (

                        <p className="text-red-600">

                            {error}

                        </p>

                    )

                }

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >

                    Create Service Order

                </button>

            </div>

        </div>

    );

};

export default NewServiceOrderForm;