import { createBrowserRouter, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";
import App from "../App";

const ProtectedRoute = ({ children, isPublic }) => {
    const { user } = useAuthStore();
    const location = useLocation();
  
    if (isPublic && user) {
      return <Navigate to="/" replace />;
    }
  
    if (!isPublic && !user) {
      return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }
  
    return children;
  };

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />, 
      children: [
        { path: '', element: <ProtectedRoute><HomePage /></ProtectedRoute> },
        { path: 'login', element: <ProtectedRoute isPublic={true}><LoginPage /></ProtectedRoute>  },
        { path: 'signup', element: <ProtectedRoute isPublic={true}><SignupPage /></ProtectedRoute> },
        { path: '*', element: <Navigate to="/" /> },
      ],
    },
  ]);

export default router;
