export interface Ticket {
    id: number;
    title: string;
    description: string;
    category: 'hardware' | 'software' | 'altro';
    state: 'aperto' | 'in lavorazione' | 'chiuso';
    priority: 'bassa' | 'media' | 'alta';
    created_at: string;
    updated_at: string;
    user_id: number;
}

export interface Comment {
    id: number;
    text: string;
    created_at: string;
    ticket_id: number;
    user_id: number;
}
export interface User {
    id: number;
    email: string;
    password: string;
    admin: number | boolean;
}

