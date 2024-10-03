"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const PrivateRoute = () => {
    const isLogged = true
    const router = useRouter()

    useEffect(() => {
        if (!isLogged) {
            router.push('/auth/signin')
        } else {
            router.push('/')
        }
    }, [isLogged])
  return (
    <></>
  )
}

export default PrivateRoute