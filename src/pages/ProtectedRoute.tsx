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
  const loading = useAuthContext()?.loading;

  if (!user || (requiredAdmin && !user.isAdmin)) {
    if (loading) {
      return <p className='text-center pt-20'>Loading...</p>;
    } else {
      return <Navigate to={'/'} replace />;
    }
  }

  return <>{children}</>;
}
