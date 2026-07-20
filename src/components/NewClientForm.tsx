import { useState } from "react";

import type { Client } from "../interfaces/Client";

interface NewClientFormProps {
    createClient: (
        client: Omit<Client, "id" | "created_at">
    ) => void;
}

const NewClientForm = ({ createClient }: NewClientFormProps) => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState("");

    function handleSubmit() {

        if (!name || !phone || !email) {

            setError("Preencha todos os campos.");

            return;

        }

        createClient({

            name,
            phone,
            email

        });

        setName("");
        setPhone("");
        setEmail("");

        setError("");

    }

    return (

        <div className="bg-white shadow rounded-lg p-6">

            <h2 className="text-2xl font-bold mb-4">

                Novo Cliente

            </h2>

            <div className="flex flex-col gap-4">

                <input
                    className="border rounded p-2"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => {

                        setName(e.target.value);
                        setError("");

                    }}
                />

                <input
                    className="border rounded p-2"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => {

                        setPhone(e.target.value);
                        setError("");

                    }}
                />

                <input
                    className="border rounded p-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {

                        setEmail(e.target.value);
                        setError("");

                    }}
                />

                {error && (

                    <p className="text-red-600">

                        {error}

                    </p>

                )}

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                    Cadastrar Cliente
                </button>

            </div>

        </div>

    );

};

export default NewClientForm;