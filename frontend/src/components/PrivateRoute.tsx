import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, type UserRole } from '@/hooks/useAuth';

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: readonly UserRole[];
  redirectTo?: string;
}

export function PrivateRoute({
  children,
  allowedRoles,
  redirectTo = '/login',
}: PrivateRouteProps) {
  const { user, role, loading } = useAuth();

  if (loading) return <div>Cargando…</div>;
  if (!user) return <Navigate to={redirectTo} replace />;
  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
