"use client"

import AuthForm from '@/components/AuthForm'
import PrivateRoute from '@/components/PrivateRoute'
import { AuthProvider } from '@/utils/AuthContext'
import React from 'react'

const SignUp = () => {
  return (
    <div>
      <AuthProvider>
        <PrivateRoute>
      <AuthForm type="signup" />
        </PrivateRoute>
      </AuthProvider>
    </div>
  )
}

export default SignUp