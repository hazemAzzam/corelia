import App from "@/App";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoginPage from "@/features/authentication/pages/LoginPage";
import SignUpPage from "@/features/authentication/pages/SignUpPage";
import ContactsPage from "@/features/contacts/pages/ContactsPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <ContactsPage />
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
    },
]);
