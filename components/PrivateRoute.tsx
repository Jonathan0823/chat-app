"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


const PrivateRoute = () => {
  const router = useRouter();
  const isAuthenticated = true; // Check if user is authenticated
  const pathname = usePathname();

  useEffect(() => {
    if(isAuthenticated){
      router.push('/');
    } else if(pathname !== '/auth/signup'){
      router.push('/auth/signin');
    }
    

  }, [isAuthenticated, router]);

 

  return <></>;
};

export default PrivateRoute