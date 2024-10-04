"use client"
 
import AuthForm from "@/components/AuthForm"
import PrivateRoute from "@/components/PrivateRoute"
import { AuthProvider } from "@/utils/AuthContext"

const SignIn = () => {
  return (
    <div>
      <AuthProvider>
      <PrivateRoute>
      <AuthForm type="signin" />
      </PrivateRoute>
      </AuthProvider>
    </div>
  )
}

export default SignIn