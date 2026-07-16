import type { OrdemServico } from "../interfaces/OrdemServico.ts";
import OrdemCard from "./ServiceCard.tsx";

interface Props {
    titulo: string;
    ordens: OrdemServico[];
}

function ColunaStatus({ titulo, ordens }: Props) {

    const lista = ordens.filter(
        ordem => ordem.status === titulo
    );

    return (
        <section>

            <h2>{titulo}</h2>

            {lista.map(ordem => (
                <OrdemCard
                    key={ordem.id}
                    ordem={ordem}
                />
            ))}

        </section>
    );
}

export default ColunaStatus;