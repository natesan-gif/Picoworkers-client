import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';
export const AuthContext = createContext(null);
const auth = getAuth(app);
import {  GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, } from 'firebase/auth';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import useAxiosPublic from '../Hooks/useAxiosPublic';
//social auth provider

   const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
 
    const axiosPublic = useAxiosPublic()
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);

        return signInWithEmailAndPassword(auth, email, password); 
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }


    const logOut = () => {
        setLoading(true);
          toast.success('Log out successfully')
        setUser(null)
           setLoading(false)
        signOut(auth);
           Navigate('/')
    };

    const updateUserProfile = (name, photo) => {
return updateProfile(auth.currentUser, {
  displayName: name, photoURL: photo
})
}
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,  (user) => {
            setUser( (user));
            if ((user)) {
                 setUser(user)
                 setLoading(false)
                //get token and store client
                const userInfo = { email:  (user).email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                                setLoading(false);
                   }
                })
 return () => unsubscribe();
            }
            else {
                //  remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token')
                    setLoading(false);
            }
            // console.log('current User', currentUser);
        
        });
        return () => {
            unsubscribe();
        };
    }, [axiosPublic]);

    const authInfo = {
          createUser,
        signIn,
        logOut,
        user,
        loading,
        updateUserProfile,
        googleSignIn,
 setUser,
      
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
