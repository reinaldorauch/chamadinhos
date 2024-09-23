export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface TicketCategory {
    id: number;
    description: string;
}

export interface TicketStatus {
    id: number;
    description: string;
}

export interface Ticket {
    id: number;
    title: string;
    description: string;
    solution_date?: Date;
    category: TicketCategory;
    status: TicketStatus;
    created_at: Date,
    modified_at: Date,
    deleted_at?: Date,
    solved_at?: Date
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
