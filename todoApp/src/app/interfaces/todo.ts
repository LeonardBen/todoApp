import { TodoTask } from './task';

export interface Status {
    id: number;
    name: string;
    tasks: TodoTask[];
}


export interface Column {
    status: string;
    tasks: TodoTask[];
}
