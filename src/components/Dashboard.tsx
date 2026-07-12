import type { OrdemServico } from "../interfaces/OrdemServico";
import ServiceCard from "./ServiceCard";

interface Props {
    ordens: OrdemServico[];
    avancarStatus: (id: number) => void;
}

function Dashboard({ ordens, avancarStatus }: Props) {
    const status = ["Aberto", "Em andamento", "Finalizado"] as const;

    return (
        <div className="grid grid-cols-3 gap-6">

            {status.map((s) => (
                <div key={s}>

                    <h2 className="text-xl font-bold mb-4">
                        {s}
                    </h2>

                    {ordens
                        .filter((ordem) => ordem.status === s)
                        .map((ordem) => (
                            <ServiceCard
                                key={ordem.id}
                                ordem={ordem}
                                avancarStatus={avancarStatus}
                            />
                        ))}

                </div>
            ))}

        </div>
    );
}

export default Dashboard;