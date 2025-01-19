import { Route, Routes } from "react-router-dom"
import { LoginForm } from "./sign-in/sign-in"
import { ForgotPassword } from "./forgot-password"
import { ResetPassword } from "./reset-password"
import { SignUpForm } from "./sign-up/sign-up"

const AuthPage = () => (
  <Routes>
    <Route path='login' element={<LoginForm />} />
    <Route path='forgot-password' element={<ForgotPassword />} />
    <Route path='reset-password' element={<ResetPassword />} />
    <Route path='sign-up' element={<SignUpForm />} />
    <Route index element={<LoginForm />} />
  </Routes>
)

export { AuthPage }