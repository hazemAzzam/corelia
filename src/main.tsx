import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./components/AuthProvider.tsx";
import { ErrorBoundary } from "react-error-boundary";

import { router } from "./routes/AppRouter.tsx";


createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback={<div>error</div>}>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </ErrorBoundary>
);
