import { useLocation, Navigate } from 'react-router-dom';
import { isValidHash } from '../utils/validateHash';

/**
 * Component that validates hash fragments in the URL
 * and redirects to 404 if the hash is invalid
 */
const HashHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // Extract hash without the #
  const hash = location.hash ? location.hash.substring(1) : '';
  
  // If there's a hash and it's not valid, redirect to 404
  if (hash && !isValidHash(hash)) {
    return <Navigate to="/404" replace state={{ from: location.pathname }} />;
  }
  
  // Otherwise, render children
  return <>{children}</>;
};

export default HashHandler;
