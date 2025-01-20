import React, { Suspense } from 'react'
// import { LoginForm } from './components/forms/sign-in/sign-in'
import { Outlet } from 'react-router-dom'
import { Loader } from './components/loader'
import { LoginForm } from './auth/components/sign-in'

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
    // <ChatLayout />
    // <LoginForm />
  )
}

export default App