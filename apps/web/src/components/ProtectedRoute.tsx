import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute(props: ProtectedRouteProps) {
  const auth = useAuth();

  if (auth.session === null) {
    return <Navigate to="/login" replace={true} />;
  }

  return <>{props.children}</>;
}

export default ProtectedRoute
