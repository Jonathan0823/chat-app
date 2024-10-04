"use client";
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/utils/AuthContext';


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!user && pathname !== '/auth/signup' && !loading) {
      router.push('/auth/signin'); // Redirect to sign-in page if not authenticated
    }
    if (user && (pathname === '/auth/signin' || pathname === '/auth/signup') && !loading) {
      router.push('/'); // Redirect to home page if authenticated
    }
  }, [user, router, pathname, loading]);



  return <>{user || pathname==="/auth/signin" || pathname==="/auth/signup" ? children : null}</>;
};

export default PrivateRoute;