import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./components/AuthProvider.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/query-client.ts";
import { Toaster } from "sonner";

import { router } from "./routes/AppRouter.tsx";


createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback={<div>error</div>}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ErrorBoundary>
);


