import { useState } from "react";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import NewServiceForm from "./components/NewServiceForm.tsx";

import type { OrdemServico } from "./interfaces/OrdemServico";

function App() {
    const [ordens, setOrdens] = useState<OrdemServico[]>([]);

    function adicionarOrdem(ordem: OrdemServico) {
        setOrdens((prev) => [...prev, ordem]);
    }

    function avancarStatus(id: number) {
    setOrdens((prev) =>
        prev.map((ordem) => {
            if (ordem.id !== id) return ordem;

            switch (ordem.status) {
                case "Aberto":
                    return { ...ordem, status: "Em andamento" };

                case "Em andamento":
                    return { ...ordem, status: "Finalizado" };

                default:
                    return ordem;
            }
        })
    );
}

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <div className="max-w-7xl mx-auto p-6">

                <NewServiceForm adicionarOrdem={adicionarOrdem} />

                <Dashboard
                    ordens={ordens}
                    avancarStatus={avancarStatus}
                />

            </div>
        </div>
    );
}

export default App;