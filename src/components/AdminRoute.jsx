import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AdminRoute() {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-blue"></div>
            </div>
        );
    }

    if (!user || profile?.role !== 'admin') {
        // Not logged in or not an admin, redirect to home
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;
