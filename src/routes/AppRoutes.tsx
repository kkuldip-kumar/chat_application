


import React, { FC, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, createBrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "@/App"
import ErrorPage from "@/errors/error-page";
import { Loader } from "@/components/loader";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { AuthPage } from "@/auth/AuthPage";
import { ChatPage } from "@/layouts/layout";
import { PrivateRoute } from "./PrivateRoute";

// const PrivateRoute = lazy(() =>
//   import("./PrivateRoute").then(module => ({ default: module.PrivateRoute }))
// );
// const AuthRoute = lazy(() =>
//   import("./AuthRoute").then(module => ({ default: module.AuthRoute }))
// );



type SuspensedViewProps = {
  children: React.ReactNode;
}

const SuspensedView: React.FC<SuspensedViewProps> = ({ children }) => {
  return (
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  );
};

const AppRoutes: FC = () => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  console.log('isAuthenticated', isAuthenticated);
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route element={<App />}>
          {/* <Route path='error/*' element={<ErrorsPage />} /> */}
          {/* <Route path='logout' element={<Logout />} /> */}
          {isAuthenticated ? (
            <>
              <Route path='/*' element={<PrivateRoute />} />
              <Route index element={<Navigate to='/chat' />} />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export { AppRoutes }


