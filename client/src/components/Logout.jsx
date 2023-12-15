import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthProvider";

export default function Logout() {
    const { onLogoutSuccess } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        onLogoutSuccess();
        navigate('/');
    });

    return <></>;
}
