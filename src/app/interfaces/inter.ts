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
    status: TaskStatus;
    projectId: number;
}
export enum TaskStatus {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed',
}