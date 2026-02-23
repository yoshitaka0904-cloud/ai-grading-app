import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isAdminEmail } from '../config/adminConfig';

function AdminRoute() {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-blue"></div>
            </div>
        );
    }

    // Checking if the user's email is explicitly allowed
    const isEmailAllowed = isAdminEmail(user?.email);

    // プロフィールのroleがadminであるか、またはメールアドレスが許可されている場合アクセス可
    if (!user || (!isEmailAllowed && profile?.role !== 'admin')) {
        // Not logged in or not an admin, redirect to home
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;
