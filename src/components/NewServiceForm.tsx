import { useState } from "react";
import type { OrdemServico } from "../interfaces/OrdemServico";

interface Props {
    adicionarOrdem: (ordem: OrdemServico) => void;
}

function NewServiceForm({ adicionarOrdem }: Props) {
    const [cliente, setCliente] = useState("");
    const [aparelho, setAparelho] = useState("");
    const [defeito, setDefeito] = useState("");
    const [erro, setErro] = useState("");

    function cadastrar() {
        if (!cliente || !aparelho || !defeito) {
            setErro("Preencha todos os campos!");
            return;
        }

        setErro("");

        const novaOrdem: OrdemServico = {
            id: Date.now(),
            cliente,
            aparelho,
            defeito,
            status: "Aberto",
        };

        adicionarOrdem(novaOrdem);

        setCliente("");
        setAparelho("");
        setDefeito("");
    }

    return (
        <div className="bg-white rounded-lg shadow p-5 mb-6">

            <h2 className="text-xl font-bold mb-4">
                Nova Ordem de Serviço
            </h2>

            <div className="grid grid-cols-3 gap-4">

                <input
                    className="border rounded p-2"
                    placeholder="Cliente"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                />

                <input
                    className="border rounded p-2"
                    placeholder="Aparelho"
                    value={aparelho}
                    onChange={(e) => setAparelho(e.target.value)}
                />

                <input
                    className="border rounded p-2"
                    placeholder="Defeito"
                    value={defeito}
                    onChange={(e) => setDefeito(e.target.value)}
                />

            </div>

            <button
                onClick={cadastrar}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Salvar
            </button>
            {erro && (
                <p className="text-red-600 mt-2">
                    {erro}
                </p>
            )}
        </div>
    );
}

export default NewServiceForm;