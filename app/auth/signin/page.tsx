"use client"
 
import AuthForm from "@/components/AuthForm"
import { z } from "zod"
 
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const SignIn = () => {
  return (
    <div>
      <AuthForm type="signin" />
    </div>
  )
}

export default SignIn