import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const { user, isCheckingAuth } = useAuthStore();
    if (!user) {
        return <Navigate to="/login" />;
    } else {
        return <Navigate to="/" />;
    }
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute element={<HomePage />} />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: "/signup",
        element: <ProtectedRoute element={<SignupPage />} />,
    },
    {
        path: "/login",
        element: <ProtectedRoute element={<LoginPage />} />,
    },
]);

export default router;
