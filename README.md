# Local-Biz-Hub

A unified local ERP and Portfolio application designed for freelancers and developers. It combines a private project management dashboard with a public-facing portfolio showcase.

## Features

### 🔒 ERP Admin (Private)
- **Dashboard**: Overview of revenue, active projects, and pending tasks.
- **Project Manager**: Create, edit, and delete projects. Mark projects as "Public" to showcase them.
- **Client CRM**: Manage client contact details and associations.
- **Task Tracker**: Simple to-do list linked to projects.
- **Authentication**: Simple password-based protection.

### 🌍 Portfolio (Public)
- **Hero Section**: Professional introduction.
- **Projects Showcase**: Automatically displays projects marked as "Public" and "Completed".
- **Project Details**: Dedicated page for each project with description and tech stack.
- **Skills & Contact**: Highlight your expertise and provide contact info.

## Setup Instructions

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run the Application**:
    ```bash
    npm run dev
    ```

3.  **Access the App**:
    - **Public Portfolio**: Open [http://localhost:3000](http://localhost:3000)
    - **Admin Dashboard**: Open [http://localhost:3000/admin](http://localhost:3000/admin)

## Default Credentials

- **Login URL**: `/login` (or try accessing `/admin`)
- **Password**: `admin123` (or set `ADMIN_PASSWORD` in `.env`)

## Data Persistence

All data is stored locally in `data/db.json`. This file is automatically created with seed data if it doesn't exist. You can back up this file to save your data.
