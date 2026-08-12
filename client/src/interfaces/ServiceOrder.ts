export interface ServiceOrder {
    id: number;
    clientId: number;
    device: string;
    description: string;
    status: "OPEN" | "IN_PROGRESS" | "CLOSED";
    createdAt: string;
}