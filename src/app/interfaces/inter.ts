export interface Project {
    id: number;
    title: string;
    createdBy: string;
    description: string;
    manager: string;
    teamMembers: string[];
    startDate: Date;
    endDate: Date;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    owner: string;
    startDate: string;
    dueDate: string;
    priority: string;
    status: string;
}

export enum TaskStatus {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed',
}