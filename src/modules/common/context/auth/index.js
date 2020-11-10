import React, { createContext, useState, useEffect } from 'react';
import { AUTH } from '../../../../core/firebase.config';
import Loader from '../../../../components/Loader';
// import { AUTH } from '../../../../core/config/firebase.config';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        AUTH.onAuthStateChanged((user) => {
            console.log(user, '@USER')
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if (pending) {
        return <Loader />
    }

    const value = {
        currentUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
