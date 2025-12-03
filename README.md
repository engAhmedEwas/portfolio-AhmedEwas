# Ahmed Ewas Portfolio

Full Stack Developer Portfolio with Admin Dashboard built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🌐 **Bilingual Support**: Full English/Arabic translation with RTL support
- 🌓 **Dark/Light Mode**: Theme toggle with persistent preferences
- 📱 **Responsive Design**: Mobile-first approach for all devices
- 🔐 **Admin Dashboard**: Secure admin panel with JWT authentication
- 📊 **Project Management**: CRUD operations for projects, clients, and tasks
- 🎨 **Modern UI**: Clean, professional design with smooth animations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: JWT (Jose)
- **Icons**: Lucide React
- **Database**: JSON file-based storage (can be replaced with any DB)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ahmed-ewas-portfolio.git

# Navigate to the project directory
cd ahmed-ewas-portfolio

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Workaround for npm Issues

If `npm run dev` fails, use:

```bash
node node_modules/next/dist/bin/next dev
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── admin/        # Admin dashboard pages
│   │   ├── api/          # API routes
│   │   ├── login/        # Login page
│   │   └── signup/       # Signup page
│   ├── components/       # React components
│   ├── lib/              # Utilities and helpers
│   └── types/            # TypeScript types
├── data/
│   └── db.json          # JSON database
└── public/              # Static assets
```

## Admin Access

To create an admin account:

1. Sign up as a regular user
2. Navigate to `/admin/create-admin` (requires existing admin login)
3. Or manually set `isAdmin: true` in `data/db.json`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variable: `JWT_SECRET`
5. Deploy!

## License

MIT License - feel free to use this for your own portfolio!

## Author

**Ahmed Ewas**  
Full Stack Developer

---

Built with ❤️ using Next.js
