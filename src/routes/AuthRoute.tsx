import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '@/store/store';

const AuthRoute = () => {
    const { isAuthenticated } = useStore(state => ({
        isAuthenticated: state.isAuthenticated,
    }));

    return isAuthenticated ? <Navigate to='/chat' /> : <Outlet />;
};

export { AuthRoute };
