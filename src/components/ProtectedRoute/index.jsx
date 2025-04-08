// components/ProtectedRoute.js
import { isTokenValid } from '@/utils/DOMUtils';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  const isValid = isTokenValid(token);

  if (!isValid) {
    return <Navigate to="/admin-login" replace />
  }

  return children;
};

export default ProtectedRoute;