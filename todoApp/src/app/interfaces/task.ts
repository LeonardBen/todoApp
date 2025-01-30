export interface TodoTask {
    id: string;
    title: string;
    description: string;
    status: string;
    deadline: string;
    latitude?: number;
    longitude?: number;
}