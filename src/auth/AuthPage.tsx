import { Route, Routes } from "react-router-dom"
import { LoginForm } from "./components/sign-in"
import { ForgotPassword } from "./components/forgot-password"
import { ResetPassword } from "./components/reset-password"
import { SignUpForm } from "./components/sign-up"

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