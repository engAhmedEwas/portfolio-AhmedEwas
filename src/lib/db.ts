import fs from 'fs/promises';
import path from 'path';
import { DatabaseSchema } from '@/types';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export class JsonDB {
    private async read(): Promise<DatabaseSchema> {
        try {
            const data = await fs.readFile(DB_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // If file doesn't exist, return empty structure or handle error
            console.error("Error reading DB:", error);
            return { projects: [], clients: [], tasks: [], profile: { name: "", role: "", bio: "", skills: [], contactEmail: "" } };
        }
    }

    private async write(data: DatabaseSchema): Promise<void> {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    }

    async getProjects() {
        const db = await this.read();
        return db.projects;
    }

    async getProjectById(id: string) {
        const db = await this.read();
        return db.projects.find((p) => p.id === id);
    }

    async createProject(project: any) {
        const db = await this.read();
        db.projects.push(project);
        await this.write(db);
        return project;
    }

    async updateProject(id: string, updates: any) {
        const db = await this.read();
        const index = db.projects.findIndex((p) => p.id === id);
        if (index !== -1) {
            db.projects[index] = { ...db.projects[index], ...updates };
            await this.write(db);
            return db.projects[index];
        }
        return null;
    }

    async deleteProject(id: string) {
        const db = await this.read();
        db.projects = db.projects.filter((p) => p.id !== id);
        await this.write(db);
    }

    async getClients() {
        const db = await this.read();
        return db.clients;
    }

    async createClient(client: any) {
        const db = await this.read();
        db.clients.push(client);
        await this.write(db);
        return client;
    }

    async updateClient(id: string, updates: any) {
        const db = await this.read();
        const index = db.clients.findIndex((c) => c.id === id);
        if (index !== -1) {
            db.clients[index] = { ...db.clients[index], ...updates };
            await this.write(db);
            return db.clients[index];
        }
        return null;
    }

    async deleteClient(id: string) {
        const db = await this.read();
        db.clients = db.clients.filter((c) => c.id !== id);
        await this.write(db);
    }

    async getTasks() {
        const db = await this.read();
        return db.tasks;
    }

    async createTask(task: any) {
        const db = await this.read();
        db.tasks.push(task);
        await this.write(db);
        return task;
    }

    async updateTask(id: string, updates: any) {
        const db = await this.read();
        const index = db.tasks.findIndex((t) => t.id === id);
        if (index !== -1) {
            db.tasks[index] = { ...db.tasks[index], ...updates };
            await this.write(db);
            return db.tasks[index];
        }
        return null;
    }

    async deleteTask(id: string) {
        const db = await this.read();
        db.tasks = db.tasks.filter((t) => t.id !== id);
        await this.write(db);
    }

    async getProfile() {
        const db = await this.read();
        return db.profile;
    }
}

export const db = new JsonDB();
