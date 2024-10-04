"use client";
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/utils/AuthContext';


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  console.log(user);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!user && pathname !== '/auth/signup' && !loading) {
      router.push('/auth/signin'); // Redirect to sign-in page if not authenticated
    }
  }, [user, router, pathname, loading]);



  return <>{user ? children : null}</>;
};

export default ProtectedRoute;