export interface ServiceOrder {
    id: number;
    client_id: number;
    device: string;
    issue: string;
    status: "open" | "in_progress" | "done";
    created_at: string;
}