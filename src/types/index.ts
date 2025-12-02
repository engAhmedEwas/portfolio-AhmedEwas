export type ProjectStatus = "In Progress" | "Completed" | "On Hold";

export interface Project {
    id: string;
    title: string;
    clientId: string;
    status: ProjectStatus;
    budget: number;
    startDate: string;
    description: string;
    isPublic: boolean;
    technologies: string[];
    imageUrl?: string;
    liveUrl?: string;
    repoUrl?: string;
}

export interface Client {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
}

export interface Task {
    id: string;
    projectId: string;
    title: string;
    status: "Pending" | "In Progress" | "Done";
    dueDate: string;
}

export interface Profile {
    name: string;
    role: string;
    bio: string;
    skills: string[];
    contactEmail: string;
}

export interface DatabaseSchema {
    projects: Project[];
    clients: Client[];
    tasks: Task[];
    profile: Profile;
}
