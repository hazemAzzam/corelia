# Corelia

Corelia is a modern, responsive Contact Management System built with **React 19**, **TypeScript**, and **Redux Toolkit**. It provides a secure and intuitive environment for users to organize their contacts with advanced features like real-time search, sorting, and pagination.

## 🚀 Features

- **Secure Authentication**: 
  - Login and Sign Up flows with Zod-based form validation.
  - "Remember Me" functionality with session persistence.
  - Automatic redirection for authenticated and unauthenticated states.
- **Advanced Contact Management**:
  - Full CRUD operations (Create, Read, Update, Delete).
  - Robust filtering by name.
  - Dynamic sorting by any field (ascending/descending).
  - Client-side pagination for smooth data exploration.
- **Persistence**: 
  - State stays synced across page reloads using a custom Redux middleware and LocalStorage.
  - User-specific contact isolation (you only see your own contacts).
- **Quality Assurance**:
  - Comprehensive test suite with **Vitest** and **React Testing Library**.
  - Integration tests for core flows (Login, Contact Creation).
- **Responsive Design**: 
  - Mobile-first approach using **Tailwind CSS 4**.
  - Adaptive Navbar with a mobile-menu for user interactions.
  - Premium components powered by **Radix UI** primitives and **shadcn/ui**.

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Data Fetching**: [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **DevOps**: [Docker](https://www.docker.com/)

## 📦 Getting Started

### Prerequisites

- **Bun** (recommended) or **Node.js**
- **npm** or **bun** packge manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd corelia
   ```

2. **Install dependencies**
   ```bash
   bun install  # or npm install
   ```

3. **Start the development server**
   ```bash
   bun dev     # or npm run dev
   ```
   The application will be available at `http://localhost:5173`.

### 🐳 Docker Setup

Run the application as a containerized production-ready build:

```bash
docker compose up --build -d
```
The production build will be served at `http://localhost:3000` via Nginx.

## 🧪 Testing

The project uses Vitest for unit and integration testing.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run a specific test file
npm test -- src/features/authentication/tests/LoginPage.test.tsx
```

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Type-checks and builds for production.
- `npm run lint`: Runs ESLint for code quality.
- `npm test`: Runs the Vitest test suite.
- `npm run preview`: Previews the production build locally.

## 📂 Project Structure

```
src/
├── components/       # Shared UI components (Navbar, ProtectedRoute, UI primitives)
├── features/         # Feature-based modules
│   ├── authentication/ # Login, SignUp, Auth state, and Hooks
│   └── contacts/       # Contacts list, CRUD dialogs, and Data management
├── lib/              # Utility libraries and shadcn config
├── state/            # Global Redux store and persistence middleware
├── types/            # Global TypeScript definitions
└── test/             # Test utilities and global setup
```
