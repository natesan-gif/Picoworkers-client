import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';
export const AuthContext = createContext(null);
const auth = getAuth(app);
import {  GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged,  sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, } from 'firebase/auth';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import useAxiosPublic from '../Hooks/useAxiosPublic.jsx';
//social auth provider

   const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
 
    
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


  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }
    const logOut = () => {
        setLoading(true);
          toast.success('Log out successfully')
        setUser(null)
           setLoading(false)
        signOut(auth);
           Navigate('/')
    };

    const updateUserProfile = (name, image) => {
return updateProfile(auth.currentUser, {
  displayName: name, photoURL: image
})
    }
      // Get token from server
  const getToken = async email => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email },

    )
    return data
  }

  // save user
  const saveUser = async user => {
      const currentUser = {
          name: user?.displayName,
      email: user?.email,
      role: 'worker',
      status: 'Verified',
      }
      console.log(currentUser)
    // const { data } = await axios.put(
    //   `${import.meta.env.VITE_API_URL}/user`,
    //   currentUser
    // )
    // return data
  }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,  (  currentUser) => {
            setUser( (  currentUser));
            if ((  currentUser)) {
                 setUser(  currentUser)
                setLoading(false)
                 saveUser(  currentUser)
                //get token and store client
                const userInfo = { email:  (  currentUser).email };
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
          setLoading,
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
