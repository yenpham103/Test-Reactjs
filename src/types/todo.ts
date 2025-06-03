export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
    updatedAt: number;
}

export type FilterType = 'all' | 'completed' | 'pending';
