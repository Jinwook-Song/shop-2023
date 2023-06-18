import { useAuthContext } from 'components/context/AuthContext';
import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  requiredAdmin?: boolean;
};

export default function ProtectedRoute({
  children,
  requiredAdmin = false,
}: Props) {
  const user = useAuthContext()?.user;

  if (!user || (requiredAdmin && !user.isAdmin)) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
}
