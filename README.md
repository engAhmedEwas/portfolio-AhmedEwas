# 🎨 Ahmed Ewas - Full Stack Developer Portfolio

A modern, feature-rich portfolio website with an integrated admin dashboard. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🌐 Public Portfolio
- **Bilingual Support**: English & Arabic with RTL/LTR auto-detection
- **Dark/Light Theme**: Seamless theme switching with persistent preferences
- **Responsive Design**: Mobile-first approach for all screen sizes
- **Project Showcase**: Display completed, public projects with descriptions
- **Project Details**: Individual pages with tech stacks and images
- **Smooth Animations**: Modern, polished user experience

### 🔐 Admin Dashboard
- **JWT Authentication**: Secure login system with token-based auth
- **Project Management**: Create, edit, and delete projects
- **Client CRM**: Manage client information and associations
- **Task Tracker**: Organize tasks linked to projects
- **Admin Panel**: Role-based access control
- **Real-time Updates**: Dynamic data management

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe JavaScript development |
| **Tailwind CSS** | Utility-first CSS framework |
| **Jose** | JWT authentication |
| **Lucide React** | Modern icon library |
| **Node.js** | Backend runtime |

---

## 📋 Prerequisites

- **Node.js**: 18.17 or higher
- **npm** or **yarn**: Latest version
- **Git**: For version control

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/engAhmedEwas/portfolio-AhmedEwas.git
cd portfolio-AhmedEwas
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
JWT_SECRET=your_super_secret_jwt_key_here_min_32_characters
NODE_ENV=development
```

> ⚠️ **Important**: Keep `JWT_SECRET` secure and never commit it to version control.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

#### Troubleshooting

If `npm run dev` fails, use the workaround:

```bash
node node_modules/next/dist/bin/next dev
```

---

## 📁 Project Structure

```
portfolio-AhmedEwas/
├── src/
│   ├── app/
│   │   ├── admin/              # 🔐 Admin dashboard
│   │   │   ├── clients/        # Client management
│   │   │   ├── projects/       # Project management
│   │   │   ├── tasks/          # Task management
│   │   │   └── create-admin/   # Admin creation
│   │   ├── api/                # 🔌 API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── clients/        # Client CRUD
│   │   │   ├── projects/       # Project CRUD
│   │   │   └── tasks/          # Task CRUD
│   │   ├── projects/           # 📄 Project detail pages
│   │   ├── login/              # 🔑 Login page
│   │   ├── signup/             # 📝 Signup page
│   │   ├── profile/            # 👤 User profile
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/             # 🧩 Reusable React components
│   │   ├── Navbar.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── db.ts               # Database utilities
│   │   ├── translations.ts     # i18n configuration
│   │   └── utils.ts            # Helper functions
│   ├── types/
│   │   └── index.ts            # TypeScript definitions
│   └── middleware.ts           # Next.js middleware
├── data/
│   └── db.json                 # 💾 JSON database
├── public/                     # 🖼️ Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 🔑 Admin Access

### First-Time Setup

1. **Sign Up**: Create a regular user account via the signup page
2. **Create Admin**: Navigate to `/admin/create-admin` (requires existing admin)
3. **Manual Setup**: Edit `data/db.json` and set `"isAdmin": true` for a user

### Login

- **URL**: [http://localhost:3000/login](http://localhost:3000/login)
- Default credentials will be set during admin creation

---

## 📊 Database

The application uses a JSON-based database stored in `data/db.json`:

```json
{
  "users": [...],
  "projects": [...],
  "clients": [...],
  "tasks": [...]
}
```

### Switching to a Real Database

To use PostgreSQL, MongoDB, or any database:

1. Replace the database utility in `src/lib/db.ts`
2. Update API routes accordingly
3. No frontend changes needed!

---

## 🚀 Building for Production

### Build the Application

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Generate Static Export (Optional)

```bash
npm run export
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variable:
   - Key: `JWT_SECRET`
   - Value: Your secure JWT secret
5. Click **Deploy**

### Environment Variables for Production

Set these in your deployment platform's environment settings:

```env
JWT_SECRET=your_production_jwt_secret_here
NODE_ENV=production
```

---

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run export` | Generate static export |

---

## 🔍 API Documentation

### Authentication Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Project Endpoints

- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project (admin)
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project (admin)
- `DELETE /api/projects/[id]` - Delete project (admin)

### Client Endpoints

- `GET /api/clients` - List all clients
- `POST /api/clients` - Create client (admin)
- `GET /api/clients/[id]` - Get client details
- `PUT /api/clients/[id]` - Update client (admin)
- `DELETE /api/clients/[id]` - Delete client (admin)

### Task Endpoints

- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create task (admin)
- `GET /api/tasks/[id]` - Get task details
- `PUT /api/tasks/[id]` - Update task (admin)
- `DELETE /api/tasks/[id]` - Delete task (admin)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👨‍💻 Author

**Ahmed Ewas**  
Full Stack Developer | Web Developer | Open Source Enthusiast

- 📧 Email: [eng.ahmedewas@gmail.com](mailto:eng.ahmedewas@gmail.com)
- 🔗 GitHub: [@engAhmedEwas](https://github.com/engAhmedEwas)
- 🌐 Portfolio: [Your Portfolio URL]

---

## 🙏 Acknowledgments

- Next.js documentation and community
- Tailwind CSS for the amazing CSS framework
- All contributors and supporters

---

## 📞 Support

If you encounter any issues or have questions:

1. Check existing [GitHub Issues](https://github.com/engAhmedEwas/portfolio-AhmedEwas/issues)
2. Create a new issue with detailed information
3. Email: [eng.ahmedewas@gmail.com](mailto:eng.ahmedewas@gmail.com)

---

**Built with ❤️ using Next.js**

_Last Updated: December 2025_
