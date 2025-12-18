import App from "@/App";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoginPage from "@/features/authentication/pages/LoginPage";
import SignUpPage from "@/features/authentication/pages/SignUpPage";
import { ContactsProvider } from "@/features/contacts/context/ContactsContext";
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
                        <ContactsProvider>
                            <ContactsPage />
                        </ContactsProvider>
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
