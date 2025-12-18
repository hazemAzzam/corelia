# Corelia

Corelia is a modern, responsive web application built with React 19 and TypeScript. It serves as a Contact Management System, featuring secure authentication and an intuitive user interface for managing connections.

## 🚀 Features

- **Authentication**: Secure Login and Sign Up flows with form validation.
- **Contact Management**: View and manage your contacts in a centralized dashboard.
- **Protected Routes**: Secure access control ensuring only authenticated users can access private pages.
- **Modern UI/UX**: Built with a mobile-first approach using Tailwind CSS 4 and Radix UI primitives.
- **State Management**: Robust global state handling using Redux Toolkit with persistence.
- **Form Handling**: Efficient form management using React Hook Form and Zod schema validation.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [Tailwind Merge](https://github.com/dcastil/tailwind-merge)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (Headless) + [Lucide React](https://lucide.dev/) (Icons)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **DevOps**: [Docker](https://www.docker.com/) (Multi-stage builds + Nginx)

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd corelia
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

### 🐳 Docker Setup (Production-ready)

If you have Docker installed, you can run the application as a containerized production build.

1. **Build and start the container**
   ```bash
   docker compose up --build -d
   ```

2. **Access the application**
   The production-optimized build will be served at `http://localhost:3000`.

3. **Stop the container**
   ```bash
   docker compose down
   ```


## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Type-checks and builds the application for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Previews the production build locally.

## � Usage

### 1. Authentication
- **Sign Up**: Navigate to the Sign Up page (`/signup`) to create a new account using your email and password.
- **Login**: Use your credentials to access the application via the Login page (`/login`).
- **Logout**: Click the User icon in the navigation bar to sign out of your session.

### 2. Dashboard
Upon logging in, you will be directed to the stored contacts dashboard. Here you can manage your personal network.

### 3. feature: Contact Management
- **View Contacts**: The dashboard displays a table of your contacts with their names and phone numbers.
- **Add Contact**: Click the **Add Contact** button to open the "New Contact" dialog. Fill in the required details and save.
- **Edit Contact**: Locate a contact in the table and click the **Pen icon** to update their information.
- **Delete Contact**: Click the **Trash icon** to permanently remove a contact from your list.

## �📂 Project Structure

```
src/
├── app/              # App application configuration
├── assets/           # Static assets (images, fonts)
├── components/       # Shared UI components (Navbar, ProtectedRoute, UI primitives)
├── features/         # Feature-based modules (Authentication, Contacts)
├── lib/              # Utility libraries and helpers
├── routes/           # Application routing configuration
├── state/            # Redux store and slices
├── types/            # Global TypeScript definitions
├── App.tsx           # Main application layout
└── main.tsx          # Application entry point
```
